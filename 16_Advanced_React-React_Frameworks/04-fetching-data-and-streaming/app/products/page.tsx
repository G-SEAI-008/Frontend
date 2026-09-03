import { z } from 'zod';

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.httpUrl(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
});

const ProductsSchema = z.array(ProductSchema);

const page = async () => {
  const res = await fetch('https://fakestoreapi.com/products/', {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  //   const data: unknown = await res.json();
  const products = ProductsSchema.parse(await res.json());

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default page;
