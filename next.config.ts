import type { NextConfig } from "next";

// ponytail: static export — the site is one page on GitHub Pages, no server.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
