import 'server-only';
import { z } from 'zod';

import { ProductSchema, ProductsSchema } from '@/lib/products';
import type { NewProduct, Product } from '@/lib/products';

const API_URL = process.env.API_URL ?? 'http://localhost:5000';

const CreateProductResponseSchema = z.object({
  message: z.string(),
  product: ProductSchema,
});

const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch products.');
  }

  const { success, data, error } = ProductsSchema.safeParse(await response.json());

  if (!success) {
    throw new Error(`Invalid products response:\n${z.prettifyError(error)}`);
  }

  return data;
};

const getProduct = async (id: string): Promise<Product | null> => {
  const response = await fetch(`${API_URL}/products/${encodeURIComponent(id)}`, {
    cache: 'no-store',
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to fetch the product.');
  }

  const { success, data, error } = ProductSchema.safeParse(await response.json());

  if (!success) {
    throw new Error(`Invalid product response:\n${z.prettifyError(error)}`);
  }

  return data;
};

const createProduct = async (product: NewProduct): Promise<Product> => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to create the product.');
  }

  const { success, data, error } = CreateProductResponseSchema.safeParse(await response.json());

  if (!success) {
    throw new Error(`Invalid create-product response:\n${z.prettifyError(error)}`);
  }

  return data.product;
};

export { createProduct, getProduct, getProducts };
