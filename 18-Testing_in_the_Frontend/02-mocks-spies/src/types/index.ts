import type { z } from 'zod';

import type { CheckoutSchema } from '../schemas/checkout';

type Country = z.infer<typeof CheckoutSchema>['country'];

export type { Country };
