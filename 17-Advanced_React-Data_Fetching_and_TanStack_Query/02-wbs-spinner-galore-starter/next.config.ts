import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/**'),
    ],
  },
  reactCompiler: true,
  typedRoutes: true,
  reactStrictMode: false,
};

export default nextConfig;
