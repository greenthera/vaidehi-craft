import { PageHeading } from "@/components/page-heading";
import Image from "@/components/site-image";
import { notFound } from "next/navigation";
import { findProduct, products } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs, InnerPage } from "@/components/inner-page";
import { QuoteForm } from "@/components/quote-form";

export const dynamicParams = false;
export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const product = findProduct((await params).slug);
  if (!product) notFound();
  return pageMetadata(`Request a Quote — ${product.name}`, `Request a tailored quotation for ${product.name}. Share your contact details with Vaidehi Craft.`, product.quotePath, product.images[0], false);
}
export default async function ProductQuotePage({ params }: { params: Promise<{ slug: string }> }) {
  const product = findProduct((await params).slug);
  if (!product) notFound();
  return <InnerPage><section className="mx-auto max-w-[1400px] px-6 pb-16 pt-7 sm:px-[5%]">
    <Breadcrumbs items={[{ name: product.name, href: product.path }, { name: "Request a quote" }]} />
    <PageHeading eyebrow="Made for your space" title="Request a quote" description={`Tell us about your requirements for ${product.name}. Our team will get in touch to discuss the details.`} />
    <div className="grid items-start gap-12 min-[751px]:grid-cols-[1.4fr_1fr] min-[751px]:gap-[10%]">
      <div className="min-w-0"><QuoteForm key={product.slug} productSlug={product.slug} /></div>
      <figure className="order-first min-w-0 min-[751px]:order-last min-[751px]:pt-4"><div className="relative mx-auto aspect-[1/1.275] w-full max-w-[440px]"><Image src={product.images[0]} alt={product.name} fill priority sizes="(max-width: 750px) 90vw, 30vw" className="object-cover" /></div><figcaption className="mt-5 text-center type-quote-caption">{product.name.replace(/ Cane (Chair|Sofa|Swing|Table)$/, "")}</figcaption></figure>
    </div>
  </section></InnerPage>;
}
