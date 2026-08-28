import { z } from 'zod';

const ProductsResponseSchema = z.object({
  products: z.array(z.unknown()),
});

const ProductSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  price: z.number().positive(),
  thumbnail: z.httpUrl(),
});

const ProductSchemaArray = z.array(ProductSchema);

export { ProductSchema, ProductSchemaArray, ProductsResponseSchema };
