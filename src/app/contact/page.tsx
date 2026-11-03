import Link from "next/link";
import { InnerPage, Breadcrumbs } from "@/components/inner-page";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Contact", "Contact Vaidehi Craft for handcrafted cane furniture, product information and tailored quotations. Stores in Surat and Pune.", "/contact");
export default function ContactPage() {
  return <InnerPage><section className="mx-auto max-w-5xl px-6 pb-24 sm:px-12"><Breadcrumbs items={[{ name: "Contact" }]} /><p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#8b7455]">Let&apos;s create something timeless</p><h1 className="mb-12 type-form-title text-[#244536]">Contact Vaidehi Craft</h1><div className="type-form-copy grid gap-10 border-y border-[#d3c5af] py-12 sm:grid-cols-3"><div><h2 className="mb-4 text-sm uppercase tracking-widest">Email</h2><a href="mailto:connect@vaidehicraft.com" className="break-words text-[#49694f]">connect@vaidehicraft.com</a></div><div><h2 className="mb-4 text-sm uppercase tracking-widest">Call</h2><a href="tel:+919824177913" className="text-[#49694f]">+91 98241 77913</a></div><div><h2 className="mb-4 text-sm uppercase tracking-widest">Our stores</h2><p className="text-[#49694f]">Surat · Pune</p></div></div><Link href="/request-quote" className="mt-12 inline-block rounded-lg bg-[#244536] px-8 py-4 text-[#f7f0e1]">Request a quote</Link></section></InnerPage>;
}
