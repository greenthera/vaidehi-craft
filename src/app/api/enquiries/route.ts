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
const pagesOrigin = "https://greenthera.github.io";
const pagesBasePath = "/vaidehi-craft";
const reply = (status: number, error?: string) => Response.json(error ? { error } : { ok: true }, {
  status,
  headers: { "Access-Control-Allow-Origin": pagesOrigin, "Vary": "Origin", "Cache-Control": "no-store" },
});

export async function OPTIONS(request: Request) {
  if (request.headers.get("origin") !== pagesOrigin) return reply(403, "This request could not be accepted.");
  return new Response(null, { status: 204, headers: {
    "Access-Control-Allow-Origin": pagesOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  } });
}

// Strips leading characters that a spreadsheet would run as a formula if opened in Excel.
function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().replace(/^[=+\-@\s]+/, "").slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  let sameHost = false;
  try { sameHost = Boolean(origin && host && new URL(origin).host === host); } catch { /* Invalid origins are rejected below. */ }
  if (!origin || (!sameHost && origin !== pagesOrigin)) return reply(403, "This request could not be accepted.");
  if (Number(request.headers.get("content-length") ?? 0) > maxBodyBytes) return reply(413, "Your enquiry is too long.");

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return reply(400, "Your enquiry could not be read. Please try again.");
  }

  // Hidden field that people never see: report success to the bot but save nothing.
  if (body.website) return reply(200);

  // Keep accepting single-product requests from previously loaded pages.
  const slugs: unknown = body.products ?? (typeof body.product === "string" ? [body.product] : undefined);
  if (!Array.isArray(slugs) || !slugs.length || slugs.length > products.length || slugs.some((slug) => typeof slug !== "string")) return reply(400, "Please select a design.");
  const selected = [...new Set(slugs as string[])].map((slug) => products.find((item) => item.slug === slug));
  if (selected.some((item) => !item)) return reply(400, "Please select valid designs.");
  const chosen = selected.filter((item): item is typeof products[number] => Boolean(item));
  const chosenCategories = productCategories.filter((category) => chosen.some((item) => item.category === category.value));
  if (body.categories !== undefined && (!Array.isArray(body.categories) || body.categories.length !== chosenCategories.length || !chosenCategories.every((category) => (body.categories as unknown[]).includes(category.value)))) return reply(400, "Please select at least one product in each chosen category.");
  const sourcePath = body.path;
  const path = origin === pagesOrigin && typeof sourcePath === "string" && sourcePath.startsWith(`${pagesBasePath}/`)
    ? sourcePath.slice(pagesBasePath.length).replace(/\/$/, "")
    : typeof sourcePath === "string" ? sourcePath.replace(/\/$/, "") : sourcePath;
  if (path !== "/request-quote" && (chosen.length !== 1 || path !== chosen[0].quotePath)) return reply(400, "This request could not be accepted.");

  const generalQuote = path === "/request-quote";
  if (generalQuote && body.contactConsent !== true) return reply(400, "Please confirm your consent to marketing contact and calls.");
  if (!generalQuote && body.detailsConfirmed !== true) return reply(400, "Please confirm your details are correct.");

  const name = text(body.name, 120);
  const email = text(body.email, 200);
  const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : "";
  const phoneDigits = phone.replace(/\D/g, "").length;
  if (!name) return reply(400, "Please enter your first name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, "Please enter a valid email address.");
  if (!/^\+?[\d\s()-]+$/.test(phone) || phoneDigits < 7 || phoneDigits > 15) return reply(400, "Please enter a valid phone number.");

  const fields = new URLSearchParams({
    [entries.source]: path === "/request-quote" ? "Request a Quote Page" : "Product Quote Page",
    [entries.pageUrl]: `${origin}${sourcePath}`,
    [entries.name]: name,
    [entries.email]: email,
    [entries.phone]: phone,
    [entries.category]: chosenCategories.map((category) => category.label).join(", "),
    [entries.product]: chosen.map((product) => product.name).join("; "),
    // Record only the confirmation actually shown on this form.
    [entries.message]: [text(body.message, 1000), `${generalQuote ? "Contact consent: I agree to Vaidehi Craft using my contact details for marketing and calls." : "Details confirmed as correct."} Recorded at ${new Date().toISOString()}.`].filter(Boolean).join("\n\n"),
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
