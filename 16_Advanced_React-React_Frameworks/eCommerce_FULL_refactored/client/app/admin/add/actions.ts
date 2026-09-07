'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { createProduct } from '@/lib/product-api';

const ProductFormSchema = z.object({
  title: z.string().trim().min(1),
  price: z.coerce.number().positive(),
  category: z.string().trim().min(1),
});

type AddProductState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

const addProduct = async (
  _previousState: AddProductState,
  formData: FormData,
): Promise<AddProductState> => {
  const result = ProductFormSchema.safeParse({
    title: formData.get('title'),
    price: formData.get('price'),
    category: formData.get('category'),
  });

  if (!result.success) {
    return { status: 'error', message: 'Enter a title, a positive price, and a category.' };
  }

  try {
    await createProduct(result.data);
    revalidatePath('/');
    return {
      status: 'success',
      message: `“${result.data.title}” was added successfully.`,
    };
  } catch {
    return { status: 'error', message: 'The product could not be added. Please try again.' };
  }
};

export { addProduct };
export type { AddProductState };
