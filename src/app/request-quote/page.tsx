import { PageHeading } from "@/components/page-heading";
import Image from "next/image";
import Link from "next/link";
import { InnerPage, Breadcrumbs } from "@/components/inner-page";
import { QuoteForm } from "@/components/quote-form";
import { pageMetadata } from "@/lib/seo";
import sofa from "../../../public/images/blue-cushion-cane-sofa-set.avif";

export const metadata = pageMetadata("Request a Quote", "Choose handcrafted cane furniture by Vaidehi Craft and request a tailored quote. Share your preferred design, finish and requirements with our team.", "/request-quote", undefined, false);

const steps = [
  { title: "Choose your design", text: "Select one or more collections and the furniture you have in mind." },
  { title: "Make it yours", text: "Tell us about your space, preferred finish, or quantity." },
  { title: "Start a conversation", text: "Send your enquiry and our team will get in touch with you." },
];

export default function QuotePage() {
  return <InnerPage>
    <div className="mx-auto max-w-[1600px] px-6 pb-10 pt-6 min-[1100px]:px-[7.32482vw] min-[1100px]:pb-16">
      <Breadcrumbs items={[{ name: "Request a quote" }]} />
      <PageHeading eyebrow="Made for your space" title="Request a quote." description="Choose your designs and share what you have in mind. We'll discuss the details with you to help find the right piece for your space." />
      <div className="grid items-start gap-8 min-[1000px]:grid-cols-[0.9fr_1.1fr] min-[1000px]:gap-12">
        <section aria-label="Quote enquiry form" className="min-w-0 rounded-none border border-[#d3c5af] bg-[#f7f4ee] p-5 min-[640px]:p-8 min-[1000px]:col-start-2 min-[1000px]:row-start-1">
          <QuoteForm appearance="inquiry" />
        </section>
        <aside aria-labelledby="quote-guide-title" className="min-w-0 min-[1000px]:col-start-1 min-[1000px]:row-start-1">
          <figure className="mb-7 overflow-hidden rounded-none bg-[#ede7df]"><div className="relative aspect-[16/10]"><Image src={sofa} alt="Handcrafted cane sofa and matching armchair with blue upholstery" fill sizes="(max-width: 999px) calc(100vw - 48px), (max-width: 1600px) 37vw, 540px" className="object-cover" /></div><figcaption className="px-5 py-4 text-sm leading-6 text-[#244536]">Thoughtful design, natural materials, and a personal touch.</figcaption></figure>
          <h2 id="quote-guide-title" className="mb-5 text-2xl text-[#244536]">From an idea to your home</h2>
          <ol className="space-y-5">{steps.map((step, index) => <li key={step.title} className="flex gap-4"><span aria-hidden="true" className="pt-1 text-xs text-[#783b18]">0{index + 1}</span><div><h3 className="mb-1 text-sm font-bold text-[#244536]">{step.title}</h3><p className="text-sm leading-6 text-[#526356]">{step.text}</p></div></li>)}</ol>
          <div className="mt-7 border-t border-[#d3c5af] pt-5 text-sm leading-7 text-[#526356]"><p>Prefer to talk first?</p><a href="tel:+919824177913" className="inline-flex min-h-11 items-center text-[#244536] underline underline-offset-4">Call +91 98241 77913</a><p><Link href="/contact" className="inline-flex min-h-11 items-center text-[#783b18] underline underline-offset-4">View all contact options</Link></p></div>
        </aside>
      </div>
    </div>
  </InnerPage>;
}
