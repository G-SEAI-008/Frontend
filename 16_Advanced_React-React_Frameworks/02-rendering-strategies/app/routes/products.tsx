// oxlint-disable import/exports-last

import { z } from 'zod';

import type { Route } from './+types/products';

const ProductSchema = z.object({
  title: z.string(),
  price: z.number(),
  image: z.url(),
});

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const product = ProductSchema.parse(await res.json());
  return product;
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

const Products = ({ loaderData }: Route.ComponentProps) => {
  return (
    <div>
      <h2>{loaderData.title}</h2>
      <p>{loaderData.price}</p>
      <img src={loaderData.image} alt={loaderData.title} width={200} />
    </div>
  );
};

export function ErrorBoundary() {
  return <p>Product not found</p>;
}

export default Products;
