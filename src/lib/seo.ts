import type { Metadata } from "next";
import referenceMetadata from "@/data/page-metadata.json";
import { resolveSiteConfiguration } from "@/lib/site-origin";

type PageCopy = { title: string; description: string; ogTitle?: string; ogDescription?: string; twitterTitle?: string; twitterDescription?: string };
const pageCopy: Record<string, PageCopy> = referenceMetadata;
export const socialImage = "/images/vaidehi-craft-cane-furniture-social.jpg";

export { resolveSiteOrigin } from "@/lib/site-origin";
const siteConfiguration = resolveSiteConfiguration(process.env);
export const siteOrigin = siteConfiguration.siteOrigin;
export const metadataOrigin = siteConfiguration.metadataOrigin;

export function metaDescription(value: string) {
  const text = value.replace(/\s+/g, " ").trim();
  return text.length <= 165 ? text : `${text.slice(0, 162).replace(/\s+\S*$/, "")}…`;
}
export function serializeJsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, "\\u003c"); }
export function pageMetadata(title: string, description: string, path: string, image = socialImage, index = true, canonicalPath = path): Metadata {
  const reference = pageCopy[path];
  // Preserve published descriptions verbatim, including the longer home copy.
  const summary = reference?.description ?? metaDescription(description);
  const pageTitle = reference?.title ?? `${title} | Vaidehi Craft`;
  const imageUrl = new URL(image, metadataOrigin).href;
  const shareImage = { url: imageUrl, alt: title || pageTitle, ...(image === socialImage ? { width: 1200, height: 630 } : {}) };
  return {
    title: pageTitle, description: summary,
    ...(siteOrigin ? { alternates: { canonical: `${siteOrigin}${canonicalPath}` } } : {}),
    robots: { index: Boolean(siteOrigin) && index, follow: true },
    openGraph: { title: reference?.ogTitle ?? pageTitle, description: reference?.ogDescription ?? summary, type: "website", siteName: "Vaidehi Craft", locale: "en_IN", ...(metadataOrigin ? { url: `${metadataOrigin}${path}` } : {}), images: [shareImage] },
    twitter: { card: "summary_large_image", title: reference?.twitterTitle ?? pageTitle, description: reference?.twitterDescription ?? summary, images: [{ url: imageUrl, alt: title || pageTitle }] },
  };
}
export function breadcrumbSchema(items: { name: string; href?: string }[]) {
  if (!metadataOrigin) return undefined;
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ name: "Home", href: "/" }, ...items].map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, ...(item.href ? { item: `${metadataOrigin}${item.href}` } : {}) })) };
}
