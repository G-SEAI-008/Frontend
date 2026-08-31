import { index, route } from '@react-router/dev/routes';
import type { RouteConfig } from '@react-router/dev/routes';

// as = type assertion (Typbehauptung)
// satisfies = prüft meine Annahme

// type User = {
//   name: string;
//   age: number;
// };

// const user: User = {
//   name: 'Renke',
// };

export default [
  index('routes/home.tsx'),
  route('/about', 'routes/about.tsx'),
  route('/hello', 'routes/hello.tsx'),
  route('/loader-demo', 'routes/loader-demo.tsx'),
  route('/error-demo', 'routes/error-demo.tsx'),
  route('/products', 'routes/products.tsx'),
] satisfies RouteConfig;
