import { productDisplayName } from "@/lib/product-display-name";
import { PageHeading } from "@/components/page-heading";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findCollection, findProduct, products } from "@/lib/catalog";
import { pageMetadata, metadataOrigin } from "@/lib/seo";
import { Breadcrumbs, InnerPage } from "@/components/inner-page";
import { ProductGallery } from "@/components/product-gallery";

export const dynamicParams = false;
export function generateStaticParams() { return products.map((product) => ({ category: product.category, slug: product.slug })); }
type Props = { params: Promise<{ category: string; slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const product = findProduct(slug);
  if (!product || product.category !== category) notFound();
  return pageMetadata(product.name, product.description, product.path, product.images[0], true, product.canonicalPath);
}
export default async function ProductPage({ params }: Props) {
  const { category, slug } = await params;
  const product = findProduct(slug);
  const collection = findCollection(category);
  if (!product || product.category !== category || !collection) notFound();
  const schema = { "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.description, brand: { "@type": "Brand", name: "Vaidehi Craft" }, ...(metadataOrigin ? { url: `${metadataOrigin}${product.path}`, image: product.images.map((image) => `${metadataOrigin}${image}`) } : {}) };
  const displayName = product.name.replace(/ Cane (Chair|Sofa|Swing|Table)$/, "");
  return <InnerPage>
    <div className="grid items-start min-[751px]:grid-cols-[1.01094fr_0.98906fr]">
      <ProductGallery key={product.slug} images={product.images} name={product.name} />
      <section className="min-w-0 px-6 pb-14 pt-8 min-[751px]:px-[7%] min-[751px]:pt-[4vw]">
        <Breadcrumbs items={[{ name: collection.name, href: `/furniture/${category}` }, { name: productDisplayName(product.name) }]} />
        <PageHeading eyebrow={`The ${collection.name} collection`} title={<>{displayName}<span className="sr-only"> — {collection.name}</span></>} />
        <div className={`space-y-7 max-[639px]:space-y-3 type-product-copy ${product.slug === "oldan-cane-swing" ? "type-oldan-copy" : ""}`}>{product.details.map((section, index) => <section key={`${section.heading}-${index}`}><h2 className="mb-2 font-normal">{section.heading} :</h2><ul className="list-disc space-y-2 max-[639px]:space-y-1 pl-5">{section.text.map((text, i) => <li key={i}>{text}</li>)}</ul></section>)}</div>
        {!product.details.length && <p className="type-product-copy">Contact us for this design&apos;s dimensions, materials and available finishes.</p>}
        {product.variantGroup && <nav aria-label="Related designs and finishes" className="mt-8 border-t border-black/15 pt-5"><h2 className="mb-3 text-sm">Designs &amp; finishes</h2><div className="flex flex-wrap gap-2">{products.filter((item) => item.variantGroup === product.variantGroup).map((item) => <Link key={item.slug} href={item.path} aria-current={item.slug === product.slug ? "page" : undefined} className="min-h-11 button-outline px-3 py-2 text-xs leading-6 aria-[current=page]:bg-[#244536] aria-[current=page]:text-white">{productDisplayName(item.name)}</Link>)}</div></nav>}
        <Link href={product.quotePath} className="mt-12 inline-flex min-h-11 min-w-[220px] items-center justify-center button-secondary px-6 py-3 type-product-button">VIEW DETAILS</Link>
      </section>
    </div>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </InnerPage>;
}
