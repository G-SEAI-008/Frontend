import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://fakestoreapi.com/img/**')],
  },
  reactCompiler: true,
  typedRoutes: true,
  reactStrictMode: false,
};

export default nextConfig;
