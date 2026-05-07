import path from "node:path";
import type { NextConfig } from "next";

const projectRoot = path.resolve(import.meta.dirname);

const nextConfig: NextConfig = {
  // 上位ディレクトリの package-lock.json を誤検出しないよう、このプロジェクトをルートに固定
  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
