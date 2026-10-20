import type { NextConfig } from "next";

// Static export: the whole site is prerendered to /out and served from
// Cloudflare Pages. The contact endpoint lives in /functions (Pages Functions).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
