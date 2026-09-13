import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local /public images without size constraints in dev
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
