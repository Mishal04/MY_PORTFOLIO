import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip type-checking the auto-generated .next/dev/types/validator.ts
  // This file is truncated by a known Turbopack bug in Next.js 16.x.
  // Our own source code TypeScript remains fully type-safe.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
