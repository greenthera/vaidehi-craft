import Image from "next/image";
import { IntentLink } from "@/components/intent-link";
import { findProduct } from "@/lib/catalog";

export function CatalogCard({ slug, image, label, featured = false, titleClass = "" }: { slug: string; image: string; label: string; featured?: boolean; titleClass?: string }) {
  const product = findProduct(slug);
  if (!product) throw new Error(`Unknown catalog design: ${slug}`);
  return <article className="min-w-0 text-center">
    <IntentLink href={product.path} className="group block"><div className="relative aspect-[1/1.2634] overflow-hidden bg-[#f4f2ed]"><Image src={image} alt={product.name} fill sizes={featured ? "(max-width: 750px) 70vw, 25vw" : "(max-width: 750px) 46vw, (max-width: 1100px) 30vw, 19vw"} className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.025]" /></div><h2 className={`mt-4 break-words ${featured ? "type-feature-title" : "type-card-title"} ${titleClass}`}>{label}</h2></IntentLink>
    <IntentLink href={product.path} aria-label={`View ${product.name} details to request a quote`} className={`mx-auto mt-3 flex min-h-11 w-[58%] min-w-[min(100%,140px)] max-w-[220px] items-center justify-center border border-[#c06144] bg-[#c06144] px-2 py-2 ${featured ? "type-feature-button" : "type-card-button"} text-white transition-colors hover:border-[#a74e36] hover:bg-[#a74e36]`}>REQUEST QUOTE</IntentLink>
  </article>;
}
