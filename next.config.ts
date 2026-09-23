import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/template", destination: "/boutique", permanent: true },
      { source: "/template/:path*", destination: "/boutique/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
