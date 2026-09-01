import type { Config } from '@react-router/dev/config';

const productIds = [1, 2, 3, 4, 5];

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // prerender: ['/', '/about', '/ssr-demo'],
  prerender: productIds.map((id) => `/products-ssr/${id}`),
} satisfies Config;
