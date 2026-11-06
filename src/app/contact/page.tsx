import { whatsappUrl } from "@/lib/whatsapp";
import { ConsentMap } from "@/components/consent-map";
import { PageHeading } from "@/components/page-heading";
import Image from "next/image";
import Link from "next/link";
import { InnerPage, Breadcrumbs } from "@/components/inner-page";
import { SocialLinks } from "@/components/social-links";
import { pageMetadata, metadataOrigin, serializeJsonLd } from "@/lib/seo";
import interior from "../../../public/images/curated-cane-living-space.avif";

export const metadata = pageMetadata("Get in Touch", "Contact Vaidehi Craft for handcrafted cane furniture, design enquiries and tailored quotations. Connect with our team and ask about our Surat and Pune stores.", "/contact");

const stores = [
  { city: "Surat", address: "2nd Fl, STALWART INSIGNIA Bldg, Piplod, Surat, Gujarat 395007" },
  { city: "Pune", address: "CREATICITY MALL, 2F-005 & 006, Ishanya Mall Rd, Shastrinagar, Yerawada, Pune, Maharashtra 411006" },
];
const primaryButton = "inline-flex min-h-12 items-center justify-center rounded-none button-primary px-6 py-3 text-sm";

export default function ContactPage() {
  const schema = metadataOrigin ? { "@context": "https://schema.org", "@type": "ContactPage", "@id": `${metadataOrigin}/contact#webpage`, url: `${metadataOrigin}/contact`, name: "Contact Vaidehi Craft", isPartOf: { "@id": `${metadataOrigin}/#website` }, mainEntity: { "@id": `${metadataOrigin}/#organization` } } : undefined;
  return <InnerPage>
    <div className="mx-auto max-w-[1600px] px-6 pb-10 pt-6 min-[1100px]:px-[7.32482vw] min-[1100px]:pb-16">
      <Breadcrumbs items={[{ name: "Get in touch" }]} />
      <section aria-labelledby="contact-title" className="grid items-center gap-8 min-[1000px]:grid-cols-2 min-[1000px]:gap-12">
        <div className="min-w-0">
          <PageHeading id="contact-title" eyebrow="Handcrafted since 1998" title="Get in touch" description="A favourite design, a new space, or a piece made just for you. Get in touch with Vaidehi Craft to discuss our cane furniture and the possibilities for your home." />
          <dl className="my-7 divide-y divide-[#d3c5af] border-y border-[#d3c5af]">
            <div className="py-4"><dt className="mb-1 text-xs uppercase tracking-widest text-[#526356]">Email us</dt><dd><a href="mailto:connect@vaidehicraft.com" className="inline-flex min-h-11 max-w-full items-center break-all py-1 text-base text-[#244536] underline-offset-4 hover:underline">connect@vaidehicraft.com</a></dd></div>
            <div className="py-4"><dt className="mb-1 text-xs uppercase tracking-widest text-[#526356]">Call us</dt><dd><a href="tel:+919824177913" className="inline-flex min-h-11 items-center py-1 text-base text-[#244536] underline-offset-4 hover:underline">+91 98241 77913</a></dd></div>
          </dl>
          <div className="flex flex-wrap gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp (opens in a new tab)" className={primaryButton}>Chat on WhatsApp</a>
            <Link href="/request-quote" className="inline-flex min-h-12 items-center justify-center rounded-none button-outline px-6 py-3 text-sm">Request a quote</Link>
          </div>
          <SocialLinks className="mt-6" />
        </div>
        <figure className="min-w-0 overflow-hidden rounded-none bg-[#ede7df]">
          <div className="relative aspect-[4/3] min-[1000px]:aspect-[4/5]"><Image src={interior} alt="A warm living space furnished with handcrafted cane furniture and woven details" fill sizes="(max-width: 999px) calc(100vw - 48px), (max-width: 1600px) 42vw, 600px" className="object-cover" /></div>
          <figcaption className="px-5 py-4 text-sm leading-6 text-[#244536]">Natural materials. Thoughtful design. Furniture with a story.</figcaption>
        </figure>
      </section>

      <section aria-labelledby="stores-title" className="mt-10 rounded-none bg-[#ede7df] p-6 min-[1000px]:mt-14 min-[1000px]:p-8">
        <div className="mb-6 max-w-xl"><h2 id="stores-title" className="mb-2 text-2xl text-[#244536]">Visit Vaidehi Craft</h2><p className="text-sm leading-6 text-[#526356]">Visit our stores in Surat and Pune to explore handcrafted cane furniture. Call our team for visiting details.</p></div>
        <div className="grid gap-4 min-[640px]:grid-cols-2">
          {stores.map(({ city, address }) => <article key={city} className="flex min-w-0 flex-col rounded-none border border-[#d3c5af] bg-white p-5"><h3 className="mb-3 text-xl text-[#244536]">{city}</h3><address className="mb-2 text-sm not-italic leading-6 text-[#526356] min-[640px]:min-h-[6rem] min-[1000px]:min-h-[4.5rem]">{city === "Surat" ? <>2nd Fl, STALWART INSIGNIA Bldg,<br />Piplod, Surat, Gujarat 395007</> : address}</address><a href="tel:+919824177913" className="mb-2 inline-flex min-h-11 items-center text-sm text-[#244536] underline underline-offset-4">+91 98241 77913</a><p><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Vaidehi Craft, ${address}`)}`} target="_blank" rel="noopener noreferrer" aria-label={`View ${city} store on Google Maps (opens in a new tab)`} className="inline-flex min-h-11 items-center text-sm text-[#783b18] underline underline-offset-4 hover:text-[#244536]">View on Google Maps</a></p><ConsentMap city={city} address={address} /></article>)}
        </div>
      </section>
    </div>
    {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />}
  </InnerPage>;
}
