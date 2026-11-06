export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { articlePath, journalArticles } from "@/lib/journal";
import { collections, products } from "@/lib/catalog";
import { siteOrigin } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteOrigin) return [];
  return [
    { url: `${siteOrigin}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteOrigin}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteOrigin}/cookie-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteOrigin}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteOrigin}/blog`, changeFrequency: "monthly", priority: 0.5 },
    ...journalArticles.map((article) => ({ url: `${siteOrigin}${articlePath(article.slug)}`, images: [`${siteOrigin}${article.image}`], changeFrequency: "yearly" as const, priority: 0.5 })),
    ...collections.map((collection) => ({ url: `${siteOrigin}/furniture/${collection.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...products.filter((product) => product.includeInSitemap).map((product) => ({ url: `${siteOrigin}${product.path}`, images: product.images.map((image) => `${siteOrigin}${image}`), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
