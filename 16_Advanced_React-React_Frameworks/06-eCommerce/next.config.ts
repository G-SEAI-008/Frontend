import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://fakestoreapi.com/img/**')],
  },

  // Optimiert React-Komponenten beim Build automatisch.
  reactCompiler: true,
  // Prüft zur Build-Zeit, ob die Ziele von Next.js-Links existieren.
  typedRoutes: true,
};

export default nextConfig;
