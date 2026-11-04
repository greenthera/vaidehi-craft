import products from "@/data/product-index.json";
import { productCategories } from "@/lib/product-categories";

// The customer's browser only talks to this route; it forwards each enquiry to the Google Form,
// whose linked Google Sheet is the record. These IDs come from the form's public page and are not secrets.
const formResponseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdbfNmV9uF-_Z6ATwDzFutH7uBRuX6BnEmTP2OMPstXvplz2A/formResponse";
const entries = {
  source: "entry.245284422",
  pageUrl: "entry.2120949635",
  name: "entry.367155242",
  email: "entry.776111767",
  phone: "entry.186914743",
  category: "entry.1668257143",
  product: "entry.198186147",
  message: "entry.305889692",
};

const maxBodyBytes = 16_000;
const reply = (status: number, error?: string) => Response.json(error ? { error } : { ok: true }, { status });

// Strips leading characters that a spreadsheet would run as a formula if opened in Excel.
function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/^[=+\-@\s]+/, "").slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host || new URL(origin).host !== host) return reply(403, "This request could not be accepted.");
  if (Number(request.headers.get("content-length") ?? 0) > maxBodyBytes) return reply(413, "Your enquiry is too long.");

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return reply(400, "Your enquiry could not be read. Please try again.");
  }

  // Hidden field that people never see: report success to the bot but save nothing.
  if (body.website) return reply(200);

  const product = products.find((item) => item.slug === body.product);
  if (!product) return reply(400, "Please select a design.");

  const path = body.path;
  if (path !== "/request-quote" && path !== product.quotePath) return reply(400, "This request could not be accepted.");

  const name = text(body.name, 120);
  const email = text(body.email, 200);
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : "";
  const phoneDigits = phone.replace(/\D/g, "").length;
  if (!name) return reply(400, "Please enter your first name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, "Please enter a valid email address.");
  if (!/^\+?[\d\s()-]+$/.test(phone) || phoneDigits < 7 || phoneDigits > 15) return reply(400, "Please enter a valid phone number.");

  const fields = new URLSearchParams({
    [entries.source]: path === "/request-quote" ? "Request a Quote Page" : "Product Quote Page",
    [entries.pageUrl]: `${origin}${path}`,
    [entries.name]: name,
    [entries.email]: email,
    [entries.phone]: phone,
    [entries.category]: productCategories.find((item) => item.value === product.category)?.label ?? product.category,
    [entries.product]: product.name,
    // Only the general quote form has a message box, so this stays blank for product quotes.
    [entries.message]: text(body.message, 1000),
  });

  try {
    // A redirect means Google refused the response (for example a closed form), so it must not count as saved.
    const response = await fetch(formResponseUrl, { method: "POST", body: fields, redirect: "manual", signal: AbortSignal.timeout(10_000) });
    if (response.status !== 200) {
      console.error(`Google Form rejected an enquiry with status ${response.status}`);
      return reply(502, "We could not save your enquiry.");
    }
  } catch (error) {
    console.error("Google Form could not be reached", error);
    return reply(502, "We could not save your enquiry.");
  }
  return reply(200);
}
