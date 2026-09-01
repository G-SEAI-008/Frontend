import { Form } from 'react-router';
// oxlint-disable import/exports-last
import z from 'zod';

import type { Route } from './+types/add-product';

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
});

export async function clientAction({ request }: Route.ClientActionArgs) {
  // const formData = await request.formData();
  // const title = formData.get('title');
  // const price = formData.get('price');
  // const category = formData.get('category');
  const { title, price, category } = Object.fromEntries(await request.formData());

  const res = await fetch('https://fakestoreapi.com/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      price: Number(price),
      description: 'test product',
      category,
      image: 'something.png',
    }),
  });

  console.log('Status', res.status);

  const newProduct = ProductSchema.parse(await res.json());
  console.log('Response', newProduct);
  return newProduct;
}

const AddProduct = ({ actionData }: Route.ComponentProps) => {
  console.log('actionData', actionData);
  return (
    <div>
      <h2>AddProduct</h2>
      <Form method='post'>
        <div>
          <label>Title:</label>
          <input name='title' placeholder='product title' required />
        </div>

        <div>
          <label>Price:</label>
          <input name='price' placeholder='$9.99' required />
        </div>

        <div>
          <label>Category:</label>
          <input name='category' placeholder='product category' required />
        </div>

        <button type='submit'>Add Product</button>
      </Form>

      {actionData && (
        <div>
          <h2>Product Added! ✅</h2>
          <p>ID: {actionData.id}</p>
          <p>Title: {actionData.title}</p>
          <p>Price: {actionData.price}</p>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
