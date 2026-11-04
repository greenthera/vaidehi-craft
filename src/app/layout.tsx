import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { ScrollToTop } from "@/components/scroll-to-top";
import { siteOrigin, metadataOrigin, pageMetadata, serializeJsonLd } from "@/lib/seo";

const siteUrl = siteOrigin;
const description = "Discover handcrafted cane chairs, sofas, swings and tables by Vaidehi Craft. Traditional craftsmanship meets modern design in furniture and thoughtfully curated spaces.";

export const metadata: Metadata = {
  ...pageMetadata("Designer & Luxury Cane Furniture", description, "/"),
  icons: { icon: "/images/vaidehi-craft-app-icon.png", apple: "/images/vaidehi-craft-app-icon.png" },
  metadataBase: new URL(metadataOrigin || "http://localhost:3000"),
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#183b2e" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", name: "Vaidehi Craft", foundingDate: "1998", email: "connect@vaidehicraft.com", telephone: "+919824177913", sameAs: ["https://www.instagram.com/vaidehi_crafts/", "https://www.facebook.com/siddharthshahvaidehicrafts/"], ...(metadataOrigin ? { "@id": `${metadataOrigin}/#organization`, url: metadataOrigin, logo: `${metadataOrigin}/images/vaidehi-craft-green-logo.avif` } : {}) },
    ...(metadataOrigin ? [{ "@type": "WebSite", "@id": `${metadataOrigin}/#website`, name: "Vaidehi Craft", url: metadataOrigin, inLanguage: "en-IN", publisher: { "@id": `${metadataOrigin}/#organization` } }] : []),
  ] };

  return (
    <html lang="en" className="antialiased">
      <body>
        <ScrollToTop />
        <a href="#main-content" className="sr-only z-[60] bg-white p-4 focus:not-sr-only focus:fixed">Skip to content</a>
        <SiteHeader />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
      </body>
    </html>
  );
}
