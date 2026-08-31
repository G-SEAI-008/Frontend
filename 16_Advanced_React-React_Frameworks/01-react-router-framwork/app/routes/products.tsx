import Products from '~/components/Products';
import type { Product } from '~/components/Products';

import type { Route } from './+types/products';

// oxlint-disable typescript/require-await typescript/only-throw-error
const loader = async () => {
  const res = await fetch('https://fakestoreapi.com/products');

  console.log('Ich bin im loader()');

  if (!res.ok) {
    throw new Response('Failed to fetch', { status: res.status });
    //  { status: res.status } bspw.  { status: 404 }
  }

  const products = (await res.json()) as Promise<Product[]>;
  return products;
};

// Nur für clientseitiges laden (clientLoader)
const HydrateFallback = () => {
  return <p>Loading...</p>;
};

const ProductsPage = ({ loaderData }: Route.ComponentProps) => {
  return (
    <div>
      <h2>Products</h2>
      <Products products={loaderData} />
    </div>
  );
};

const ErrorBoundary = () => {
  return (
    <div>
      <h2>Something went wrong!</h2>
    </div>
  );
};

export default ProductsPage;
export { loader, HydrateFallback, ErrorBoundary };
