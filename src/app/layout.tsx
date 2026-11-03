import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { ScrollToTop } from "@/components/scroll-to-top";
import { siteOrigin, metaDescription } from "@/lib/seo";

const siteUrl = siteOrigin;
const title = "Designer & Luxury Cane Furniture | Vaidehi Craft";
const description = "Discover handcrafted cane chairs, sofas, swings and tables by Vaidehi Craft. Traditional craftsmanship meets modern design in furniture and thoughtfully curated spaces.";

export const metadata: Metadata = {
  icons: { icon: "/images/vaidehi-craft-app-icon.png", apple: "/images/vaidehi-craft-app-icon.png" },
  metadataBase: new URL(siteUrl || "http://localhost:3000"),
  title,
  description: metaDescription(description),
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
  openGraph: { title, description, type: "website", siteName: "Vaidehi Craft", ...(siteUrl ? { url: siteUrl } : {}), images: [{ url: "/images/vaidehi-craft-cane-furniture-social.jpg", width: 1200, height: 630, alt: "Handcrafted cane furniture by Vaidehi Craft" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/images/vaidehi-craft-cane-furniture-social.jpg"] },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#183b2e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@type": "Organization", name: "Vaidehi Craft", foundingDate: "1998", email: "connect@vaidehicraft.com", telephone: "+919824177913", ...(siteUrl ? { url: siteUrl, logo: `${siteUrl.replace(/\/$/, "")}/images/vaidehi-craft-green-logo.avif` } : {}) };
  return (
    <html lang="en" className="antialiased">
      <body>
        <ScrollToTop />
        <a href="#main-content" className="sr-only z-[60] bg-white p-4 focus:not-sr-only focus:fixed">Skip to content</a>
        <SiteHeader />
        {children}
        {siteUrl && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: "Vaidehi Craft", url: siteUrl }) }} />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
