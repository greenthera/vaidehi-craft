import Image from "@/components/site-image";
import { IntentLink } from "@/components/intent-link";
import { findProduct } from "@/lib/catalog";

export function CatalogCard({ slug, image, label, featured = false, titleClass = "" }: { slug: string; image: string; label: string; featured?: boolean; titleClass?: string }) {
  const product = findProduct(slug);
  if (!product) throw new Error(`Unknown catalog design: ${slug}`);
  return <article className="min-w-0 text-center">
    <IntentLink href={product.path} className="group block"><div className="relative aspect-[1/1.2634] overflow-hidden bg-[#f4f2ed]"><Image src={image} alt={product.name} fill sizes={featured ? "(max-width: 384px) calc(100vw - 64px), 320px" : "(max-width: 750px) 45vw, (max-width: 1099px) 30vw, 18vw"} className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]" /></div><h2 className={`mt-4 break-words ${featured ? "type-feature-title" : "type-card-title"} ${titleClass}`}>{label}</h2></IntentLink>
    <IntentLink href={product.path} aria-label={`View ${product.name} details`} className={`mx-auto mt-3 flex min-h-11 w-[58%] min-w-[min(100%,140px)] max-w-[220px] items-center justify-center button-secondary-outline px-2 py-2 ${featured ? "type-feature-button" : "type-card-button"}`}>VIEW DETAILS</IntentLink>
  </article>;
}
