import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    reactCompiler: true
  },
  reactComponentAnnotation: {
    enabled: process.env.NODE_ENV === 'development',
  },
  reactStrictMode: true,
  reactComponentAnnotation: {
    enabled: process.env.NODE_ENV === 'development',
  },
 
};

export default nextConfig;
