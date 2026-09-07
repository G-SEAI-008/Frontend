import { z } from 'zod';

const ProductSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  price: z.number().nonnegative(),
  category: z.string().min(1),
  image: z.httpUrl(),
});

const ProductsSchema = z.array(ProductSchema);

type Product = z.infer<typeof ProductSchema>;

type NewProduct = Pick<Product, 'title' | 'price' | 'category'>;

export { ProductSchema, ProductsSchema };
export type { NewProduct, Product };
