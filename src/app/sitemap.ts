import type { MetadataRoute } from "next";
import { collections, products } from "@/lib/catalog";
import { siteOrigin } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin) return [];
  return [
    { url: `${siteOrigin}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteOrigin}/contact`, changeFrequency: "monthly", priority: 0.5 },
    ...collections.map((collection) => ({ url: `${siteOrigin}/furniture/${collection.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...products.filter((product) => product.includeInSitemap).map((product) => ({ url: `${siteOrigin}${product.path}`, images: product.images.map((image) => `${siteOrigin}${image}`), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
