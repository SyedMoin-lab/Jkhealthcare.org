import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Removed 'output: "export"' to enable dynamic rendering for Clerk authentication
  // Note: This means you'll need a Node.js server or Vercel/Netlify for deployment
  // Static export is not compatible with authentication
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
