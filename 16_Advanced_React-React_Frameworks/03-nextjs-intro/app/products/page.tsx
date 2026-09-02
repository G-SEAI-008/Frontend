import { z } from 'zod';

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
});

const ProductsSchema = z.array(ProductSchema);

const Products = async () => {
  const res = await fetch('https://fakestoreapi.com/products/');

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const products = ProductsSchema.parse(await res.json());

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title} = {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
