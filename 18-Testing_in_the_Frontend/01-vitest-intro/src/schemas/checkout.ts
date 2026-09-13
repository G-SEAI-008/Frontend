import { z } from 'zod';

export const CheckoutSchema = z.object({
  net: z.number().positive(),
  country: z.enum(['UK', 'DE', 'FR']),
});
