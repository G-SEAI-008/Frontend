import type { Country } from './types';
import { VATRates } from './vatRates';

const calculateTotal = (net: number, country: Country): number => {
  return net * (1 + VATRates[country]);
};

export { calculateTotal };

// UK: 100 x 1.20 = 120
// FR: 100 x 1.20 x 1.20 = 144
