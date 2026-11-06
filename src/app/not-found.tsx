import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/site-image";
import { InnerPage } from "@/components/inner-page";
import { PageHeading } from "@/components/page-heading";
import { collections } from "@/lib/catalog";
import interior from "../../public/images/curated-cane-living-space.avif";

export const metadata: Metadata = {
  title: "Page Not Found | Vaidehi Craft",
  description: "This page could not be found. Explore Vaidehi Craft furniture collections or contact us for help.",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return <InnerPage>
    <section aria-labelledby="not-found-title" className="mx-auto max-w-[1600px] px-6 pb-12 pt-8 text-[#244536] min-[1100px]:px-[7.32482vw] min-[1100px]:py-12">
      <div className="grid border border-[#ded5c8] bg-[#f7f4ee] min-[900px]:grid-cols-[1.1fr_0.9fr]">
        <div className="min-w-0 p-6 sm:p-10 min-[1100px]:p-12">
          <PageHeading id="not-found-title" eyebrow="404 · Page not found" title="A little off the beaten path" description="We couldn’t find the page you’re looking for. It may have moved, or the link may be incorrect. Let’s help you find your way back." />
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="inline-flex min-h-12 items-center justify-center button-primary px-6 py-3 text-sm">Back to home <span aria-hidden="true" className="ml-3">→</span></Link>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center button-outline px-6 py-3 text-sm">Get in touch</Link>
          </div>
          <nav aria-label="Explore furniture collections" className="mt-8 border-t border-[#d3c5af] pt-6">
            <h2 className="mb-3 text-base font-bold">Find your next favourite piece</h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">{collections.map((collection) => <li key={collection.slug}><Link href={`/furniture/${collection.slug}`} className="inline-flex min-h-11 items-center text-sm text-[#783b18] underline underline-offset-4 hover:text-[#244536]">{collection.name}</Link></li>)}</ul>
          </nav>
        </div>
        <figure className="relative min-h-72 overflow-hidden bg-[#ede7df] min-[900px]:min-h-full">
          <Image src={interior} alt="A welcoming living space with handcrafted cane furniture and natural woven textures" fill sizes="(max-width: 899px) calc(100vw - 48px), (max-width: 1600px) 40vw, 570px" className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#142a20]/85 via-transparent to-transparent" />
          <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10"><p className="mb-3 text-xs uppercase tracking-[0.18em]">Handcrafted since 1998</p><p className="max-w-xs text-2xl leading-snug [font-family:var(--font-reference-heading)]">There’s always a way<br />back to something beautiful.</p></figcaption>
        </figure>
      </div>
    </section>
  </InnerPage>;
}
