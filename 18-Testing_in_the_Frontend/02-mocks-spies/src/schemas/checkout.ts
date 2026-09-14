import { z } from 'zod';

const CheckoutSchema = z.object({
  net: z.number().positive(),
  country: z.enum(['UK', 'DE', 'FR']),
});

export { CheckoutSchema };
