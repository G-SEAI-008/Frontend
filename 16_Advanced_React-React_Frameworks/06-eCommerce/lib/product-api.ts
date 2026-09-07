'use server';

import z from 'zod';

import { ProductSchema, ProductsSchema } from './products';
import type { NewProduct, Product } from './products';

const { API_URL } = process.env;

const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const { success, data, error } = ProductsSchema.safeParse(await response.json());

  if (!success) {
    throw new Error(`Invalid products response:\n${z.prettifyError(error)}`);
  }

  return data;
};

const getProduct = async (id: string): Promise<Product | null> => {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to fetch the product.');
  }

  const json = await response.text();

  if (!json) {
    return null;
  }

  const { success, data, error } = ProductSchema.safeParse(JSON.parse(json));

  if (!success) {
    throw new Error(`Invalid product response:\n${z.prettifyError(error)}`);
  }

  return data;
};

const createProduct = async (product: NewProduct): Promise<void> => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to create the product.');
  }
};

export { createProduct, getProduct, getProducts };
