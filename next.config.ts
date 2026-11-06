import type { NextConfig } from "next";
import legacyRedirects from "./src/data/legacy-redirects.json";

const staticExport = process.env.STATIC_EXPORT === "true";
const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export", basePath: process.env.NEXT_PUBLIC_BASE_PATH || "", images: { unoptimized: true }, outputFileTracingRoot: process.cwd() } : {}),
  trailingSlash: staticExport,
  poweredByHeader: false,
  ...(staticExport ? {} : {
  async redirects() { return staticExport ? [] : legacyRedirects; },
  async headers() {
    if (staticExport) return [];
    const mobileHero = {
      source: "/images/home-hero-mobile-:asset.avif",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    };
    const assets = ["/images/:path*", "/media/:path*", "/fonts/:path*"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: "public, max-age=3600" }],
    }));
    return [
      { source: "/:path*", headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ] },
      ...assets,
      mobileHero,
    ];
  },
  }),
};

export default nextConfig;
