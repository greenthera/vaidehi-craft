import type { NextConfig } from "next";
import legacyRedirects from "./src/data/legacy-redirects.json";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() { return legacyRedirects; },
  async headers() {
    return ["/images/:path*", "/media/:path*", "/fonts/:path*"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: "public, max-age=3600" }],
    }));
  },
};

export default nextConfig;
