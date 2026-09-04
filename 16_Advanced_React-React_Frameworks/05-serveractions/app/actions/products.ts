'use server';

import { revalidateTag, updateTag } from 'next/cache';
import { z } from 'zod';

const ProductFormSchema = z.object({
  title: z.string().min(1),
  price: z.string().nonempty(),
});

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
});

const addProduct = async (formData: FormData) => {
  const productForm = ProductFormSchema.parse(Object.fromEntries(formData));
  const res = await fetch('https://fakestoreapi.com/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: productForm.title,
      price: Number(productForm.price),
      description: 'test product',
      image: 'something.avif',
      category: 'electronics',
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to add product');
  }
  const newProduct = ProductSchema.parse(await res.json());
  updateTag('products');
  // revalidateTag('products', ' max');
  console.log('New Product:', newProduct);
};

const getProducts = async () => {
  const res = await fetch('https://fakestoreapi.com/products', {
    cache: 'force-cache',
    next: { tags: ['products'] },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return ProductSchema.array().parse(await res.json());
};

export { addProduct, getProducts };
