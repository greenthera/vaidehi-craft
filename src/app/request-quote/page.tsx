import { InnerPage, Breadcrumbs } from "@/components/inner-page";
import { QuoteForm } from "@/components/quote-form";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Request a Quote", "Request a tailored quote for Vaidehi Craft cane furniture.", "/request-quote", undefined, false);
export default function QuotePage() {
  return <InnerPage><section className="mx-auto max-w-3xl px-6 pb-20"><Breadcrumbs items={[{ name: "Request a quote" }]} /><h1 className="mb-4 type-form-title text-[#244536]">Made for your space.</h1><p className="mb-10 max-[639px]:mb-4 type-form-copy text-[#76654f]">Choose a design and tell us what you have in mind.</p><QuoteForm /></section></InnerPage>;
}
