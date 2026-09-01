import { index, route } from '@react-router/dev/routes';
import type { RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/csr-demo', 'routes/csr-demo.tsx'),
  route('/ssr-demo', 'routes/ssr-demo.tsx'),
  route('/about', 'routes/about.tsx'),
  route('/add-product', 'routes/add-product.tsx'),
  route('/add-product-ssr', 'routes/add-product-ssr.tsx'),
  route('/products/:id', 'routes/products.tsx'),
  route('/products-ssr/:id', 'routes/products-ssr.tsx'),
] satisfies RouteConfig;
