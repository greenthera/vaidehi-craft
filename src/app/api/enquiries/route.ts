import { buildEnquiry, formResponseUrl } from "@/lib/enquiry";

const maxBodyBytes = 16_000;
const reply = (status: number, error?: string) => Response.json(error ? { error } : { ok: true }, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  let sameHost = false;
  try { sameHost = Boolean(origin && host && new URL(origin).host === host); } catch { /* Invalid origins are rejected below. */ }
  if (!origin || !sameHost) return reply(403, "This request could not be accepted.");
  if (Number(request.headers.get("content-length") ?? 0) > maxBodyBytes) return reply(413, "Your enquiry is too long.");

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return reply(400, "Your enquiry could not be read. Please try again.");
  }

  // Hidden field that people never see: report success to the bot but save nothing.
  if (body.website) return reply(200);

  const enquiry = buildEnquiry(body, origin);
  if ("error" in enquiry) return reply(400, enquiry.error);

  try {
    // A redirect means Google refused the response (for example a closed form), so it must not count as saved.
    const response = await fetch(formResponseUrl, { method: "POST", body: enquiry.fields, redirect: "manual", signal: AbortSignal.timeout(10_000) });
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
