import type { Country } from './types/index.ts';
import { VATRates } from './vatRates';

const calculateTotal = (net: number, country: Country): number => {
  return net * (1 + VATRates[country]);
};

export { calculateTotal };
