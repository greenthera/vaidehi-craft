import type { NextConfig } from "next";
import legacyRedirects from "./src/data/legacy-redirects.json";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() { return legacyRedirects; },
};

export default nextConfig;
