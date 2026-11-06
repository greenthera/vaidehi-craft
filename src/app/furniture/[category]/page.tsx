import { PageHeading } from "@/components/page-heading";
import Image from "@/components/site-image";
import { notFound } from "next/navigation";
import { collections, findCollection, products } from "@/lib/catalog";
import { pageMetadata, metadataOrigin } from "@/lib/seo";
import { Breadcrumbs, InnerPage } from "@/components/inner-page";
import { CatalogCard } from "@/components/catalog-card";
import { StoreVideo } from "@/components/store-video";
import { CollectionContact } from "@/components/collection-contact";
import layouts from "@/data/collection-layouts.json";

export const dynamicParams = false;
export function generateStaticParams() { return collections.map((collection) => ({ category: collection.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const collection = findCollection((await params).category);
  if (!collection) notFound();
  return pageMetadata(collection.name, `Explore ${collection.name.toLowerCase()} by Vaidehi Craft. Browse handcrafted designs and product photographs, then request a tailored quote.`, `/furniture/${collection.slug}`);
}
export default async function CollectionPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const collection = findCollection(category);
  if (!collection || !(category in layouts)) notFound();
  const layout = layouts[category as keyof typeof layouts];
  const items = products.filter((product) => product.category === category);
  const schema = { "@context": "https://schema.org", "@type": "ItemList", name: collection.name, numberOfItems: items.length, itemListElement: items.map((product, index) => ({ "@type": "ListItem", position: index + 1, name: product.name, ...(metadataOrigin ? { url: `${metadataOrigin}${product.path}` } : {}) })) };
  return <InnerPage flush>
    <section aria-label={`${collection.name} film`} className="h-[clamp(380px,50.78125vw,850px)]"><StoreVideo src={collection.video} poster={layout.poster} label={`${collection.name} by Vaidehi Craft`} /></section>
    <div className="px-[3.85%] pb-0 pt-8 sm:px-[1.95%]"><Breadcrumbs items={[{ name: collection.name }]} /><PageHeading className="!mb-4" eyebrow="Handcrafted for your home" title={`Cane ${category}`} description={`Explore our ${category} collection and find a design for your space. Ask our team about dimensions, finishes, and available options.`} /></div>
    {layout.sections.map((section, index) => section.type === "feature" && section.image
      ? <section key={index} aria-label={`Featured ${collection.name.toLowerCase()}`} className={`mb-14 grid ${section.cards.length ? "min-[751px]:grid-cols-[1.242fr_0.758fr]" : ""}`}><div className="relative min-h-[400px] min-[751px]:min-h-[59.375vw]"><Image src={section.image} alt={`${collection.name} in a styled living space`} fill sizes={section.cards.length ? "(max-width: 750px) 100vw, 62vw" : "100vw"} className="object-cover" /></div>{section.cards.length > 0 && <div className="flex flex-col items-center justify-center gap-10 px-8 py-12">{section.cards.map((card, i) => <div key={`${card.slug}-${i}`} className="w-full max-w-[320px]"><CatalogCard {...card} featured titleClass={category === "tables" ? "type-card-heading" : ""} /></div>)}</div>}</section>
      : <section key={index} aria-label={`${collection.name} designs`} className="grid grid-cols-2 gap-x-[2.5641vw] gap-y-10 px-[3.85%] pb-14 pt-5 min-[751px]:grid-cols-3 min-[1100px]:grid-cols-5 min-[1100px]:gap-x-[1.5625vw] min-[1100px]:gap-y-[4.6875vw] min-[1100px]:px-[1.95%]">{section.cards.map((card, i) => <CatalogCard key={`${card.slug}-${i}`} {...card} titleClass={category === "chairs" ? (index === 0 ? "type-card-catalog" : "type-card-store") : category === "swings" ? "type-card-catalog" : category === "tables" ? "type-card-statement" : index > 0 ? "type-sofa-secondary" : ""} />)}</section>)}
    <CollectionContact />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </InnerPage>;
}
