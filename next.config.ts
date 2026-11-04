import type { NextConfig } from "next";
import legacyRedirects from "./src/data/legacy-redirects.json";

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  async redirects() { return legacyRedirects; },
  async headers() {
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
    ];
  },
};

export default nextConfig;
