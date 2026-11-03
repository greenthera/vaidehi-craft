import type { Metadata } from "next";

const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
export const siteOrigin = configuredOrigin ? new URL(configuredOrigin).origin : undefined;
export function metaDescription(value: string) {
  const text = value.replace(/\s+/g, " ").trim();
  return text.length <= 165 ? text : `${text.slice(0, 162).replace(/\s+\S*$/, "")}…`;
}
export function pageMetadata(title: string, description: string, path: string, image = "/images/vaidehi-craft-cane-furniture-social.jpg", index = true, canonicalPath = path): Metadata {
  const summary = metaDescription(description);
  const pageTitle = `${title} | Vaidehi Craft`;
  return {
    title: pageTitle, description: summary,
    ...(siteOrigin ? { alternates: { canonical: `${siteOrigin}${canonicalPath}` } } : {}),
    robots: { index: Boolean(siteOrigin) && index, follow: true },
    openGraph: { title: pageTitle, description: summary, type: "website", siteName: "Vaidehi Craft", locale: "en_IN", ...(siteOrigin ? { url: `${siteOrigin}${path}` } : {}), images: [{ url: image, alt: title }] },
    twitter: { card: "summary_large_image", title: pageTitle, description: summary, images: [{ url: image, alt: title }] },
  };
}
export function breadcrumbSchema(items: { name: string; href?: string }[]) {
  if (!siteOrigin) return undefined;
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ name: "Home", href: "/" }, ...items].map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, ...(item.href ? { item: `${siteOrigin}${item.href}` } : {}) })) };
}
