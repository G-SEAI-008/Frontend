import { Router } from 'express';
import { z } from 'zod';

import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './store.ts';

const ProductIdSchema = z.coerce.number().int().positive();
const ProductInputSchema = z.object({
  title: z.string().trim().min(1),
  price: z.number().positive(),
  category: z.string().trim().min(1),
});

const productsRouter = Router();

productsRouter.get('/', (_request, response) => {
  response.json(getProducts());
});

productsRouter.get('/:id', (request, response) => {
  const idResult = ProductIdSchema.safeParse(request.params.id);

  if (!idResult.success) {
    response.status(400).json({ message: 'Invalid product id.' });
    return;
  }

  const product = getProduct(idResult.data);

  if (!product) {
    response.status(404).json({ message: 'Product not found.' });
    return;
  }

  response.json(product);
});

productsRouter.post('/', (request, response) => {
  const result = ProductInputSchema.safeParse(request.body);

  if (!result.success) {
    response.status(400).json({ message: 'Invalid product data.' });
    return;
  }

  const product = createProduct(result.data);
  response.status(201).json({ message: 'Product created.', product });
});

productsRouter.put('/:id', (request, response) => {
  const idResult = ProductIdSchema.safeParse(request.params.id);

  if (!idResult.success) {
    response.status(400).json({ message: 'Invalid product id.' });
    return;
  }

  const inputResult = ProductInputSchema.safeParse(request.body);

  if (!inputResult.success) {
    response.status(400).json({ message: 'Invalid product data.' });
    return;
  }

  const product = updateProduct(idResult.data, inputResult.data);

  if (!product) {
    response.status(404).json({ message: 'Product not found.' });
    return;
  }

  response.json({ message: 'Product updated.', product });
});

productsRouter.delete('/:id', (request, response) => {
  const idResult = ProductIdSchema.safeParse(request.params.id);

  if (!idResult.success) {
    response.status(400).json({ message: 'Invalid product id.' });
    return;
  }

  const product = deleteProduct(idResult.data);

  if (!product) {
    response.status(404).json({ message: 'Product not found.' });
    return;
  }

  // response.json({ message: 'Product deleted.', product });
  response.status(418).json({ message: 'Product deleted.', product });
});

export default productsRouter;
