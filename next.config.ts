import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sc01.alicdn.com',
      },
    ],
  },
};

export default nextConfig;
