import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://avatars.githubusercontent.com/u/25434461?v=4"),
    ],
  },
};

export default nextConfig;
