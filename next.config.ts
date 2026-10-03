import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow both localhost and 127.0.0.1 during `next dev` (HMR / assets).
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async rewrites() {
    return [
      // Browsers that probe /favicon.ico get the canonical Worknaro PNG.
      {
        source: "/favicon.ico",
        destination:
          "/static/assets/images/Worknaro-Logos/favicon/worknaro-favicon-tab.png",
      },
    ];
  },
};

export default nextConfig;
