import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
