// oxlint-disable import/exports-last

import { Suspense } from 'react';
import { Await } from 'react-router';
import { z } from 'zod';

import type { Route } from './+types/products-ssr';

const ProductSchema = z.object({
  title: z.string(),
  price: z.number(),
  image: z.url(),
});

async function fetchProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) {
    throw new Error('Product not found');
  }

  const data: unknown = await res.json();
  return ProductSchema.parse(data);
}

export function loader({ params }: Route.LoaderArgs) {
  const product = fetchProduct(params.id); // absichtlich kein await

  return { product };
}

const Products = ({ loaderData }: Route.ComponentProps) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={loaderData.product}>
        {(product) => (
          <div>
            <h2>{product.title}</h2>
            <p>{product.price}</p>
            <img src={product.image} alt={product.title} width={200} />
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export function ErrorBoundary() {
  return <p>Product not found</p>;
}

export default Products;
