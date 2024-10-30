import type { NextConfig } from "next";

const isMobile = process.env.NEXT_PUBLIC_IS_MOBILE === "true";

const nextConfig: NextConfig = {
  ...(isMobile ? { output: "export" } : {}),
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
