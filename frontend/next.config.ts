import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict mode catches potential React issues during development
  reactStrictMode: true,

  // Allow images from external hosts if car images are added in future
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
