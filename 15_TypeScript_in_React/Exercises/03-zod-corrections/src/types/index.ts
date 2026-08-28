import type z from 'zod';

import type { CatFactsSchema } from '../schemas/catFacts';
import type { ProductSchema } from '../schemas/products';

type CatFact = z.infer<typeof CatFactsSchema>;

type Product = z.infer<typeof ProductSchema>;

export type { CatFact, Product };
