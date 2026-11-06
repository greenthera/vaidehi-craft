import { PageHeading } from "@/components/page-heading";
import Link from "next/link";
import Image from "next/image";
import { InnerPage } from "@/components/inner-page";
import { pageMetadata } from "@/lib/seo";
import interior from "../../../public/images/curated-cane-living-space.avif";

export const metadata = pageMetadata("Thank You", "Your enquiry has reached Vaidehi Craft.", "/thank-you", undefined, false);

export default function ThankYouPage() {
  return <InnerPage>
    <section aria-labelledby="thank-you-title" className="mx-auto max-w-[1600px] px-6 py-8 text-[#244536] min-[1100px]:px-[7.32482vw] min-[1100px]:py-12">
      <div className="overflow-hidden rounded-none border border-[#ded5c8] bg-[#f7f4ee] shadow-[0_16px_60px_-30px_#24453640]">
        <div className="grid min-[1000px]:grid-cols-[1.1fr_0.9fr]">
          <div className="min-w-0 p-6 sm:p-10 min-[1100px]:p-12">
            <div aria-hidden="true" className="mb-6 flex size-14 items-center justify-center rounded-none border border-[#24453630] bg-[#e7ede3]">
              <svg viewBox="0 0 24 24" fill="none" className="size-7" stroke="currentColor" strokeWidth="1.5"><path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <PageHeading id="thank-you-title" eyebrow="Enquiry received" title="Thank you" description="Your enquiry is with the Vaidehi Craft team. We look forward to learning about your space and helping you find a piece that feels at home." />
            <div className="my-7 border-y border-[#d3c5af] py-5">
              <h2 className="mb-4 text-base font-bold">What happens next?</h2>
              <ol className="space-y-4">
                {[
                  { title: "We review your enquiry", text: "Our team will look through the details you shared." },
                  { title: "We get in touch", text: "We’ll discuss your preferred design, finish, and requirements with you." },
                ].map((step, index) => <li key={step.title} className="flex gap-3"><span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-none bg-[#ede7df] text-xs text-[#783b18]">0{index + 1}</span><div><h3 className="text-sm font-bold">{step.title}</h3><p className="mt-1 text-sm leading-6 text-[#526356]">{step.text}</p></div></li>)}
              </ol>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/furniture/chairs" className="inline-flex min-h-12 items-center justify-center rounded-none button-primary px-6 py-3 text-sm">Explore our furniture <span aria-hidden="true" className="ml-3">→</span></Link>
              <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-none button-outline px-6 py-3 text-sm">Back to home</Link>
            </div>
          </div>
          <figure className="relative min-h-72 overflow-hidden min-[1000px]:min-h-full">
            <Image src={interior} alt="Handcrafted cane furniture in a warm, naturally styled living space" fill sizes="(max-width: 999px) calc(100vw - 48px), (max-width: 1600px) 40vw, 570px" className="object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#142a20]/85 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10"><p className="mb-3 text-[10px] uppercase tracking-[0.22em]">Vaidehi Craft · Since 1998</p><p className="max-w-xs text-2xl leading-snug [font-family:var(--font-reference-heading)]">Natural materials.<br />A personal touch.<br />A piece of your story.</p></figcaption>
          </figure>
        </div>
        <div className="flex flex-col gap-3 border-t border-[#ded5c8] bg-[#ede7df] px-6 py-5 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-10 min-[1100px]:px-12">
          <p className="leading-6">Have something else in mind? We&apos;re here to help.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1"><a href="tel:+919824177913" className="inline-flex min-h-11 items-center text-[#783b18] underline underline-offset-4">+91 98241 77913</a><Link href="/contact" className="inline-flex min-h-11 items-center underline underline-offset-4">Get in touch <span aria-hidden="true" className="ml-2">↗</span></Link></div>
        </div>
      </div>
    </section>
  </InnerPage>;
}
