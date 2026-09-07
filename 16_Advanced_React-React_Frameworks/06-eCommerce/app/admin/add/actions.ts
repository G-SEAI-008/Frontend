'use server';

import z from 'zod';

import { createProduct } from '@/lib/product-api';

type AddProductState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const ProductFormSchema = z.object({
  title: z.string().trim().min(1),
  price: z.coerce.number().positive(),
  category: z.string().trim().min(1),
});

const addProduct = async (
  _previousState: AddProductState,
  formData: FormData,
): Promise<AddProductState> => {
  const { success, data, error } = ProductFormSchema.safeParse(Object.fromEntries(formData));

  if (!success) {
    return {
      status: 'error',
      message: 'Enter a title, a positive price, and a category.',
    };
  }

  try {
    await createProduct(data);
    return {
      status: 'success',
      message: `“${data.title}” was sent successfully.`,
    };
  } catch {
    return {
      status: 'error',
      message: 'The product could not be added. Please try again.',
    };
  }
};

export { addProduct, type AddProductState };
