import { VATRates } from './vatRates';
import type { Country } from './types';

export const calculateTotal = (net: number, country: Country): number => {
  if (country !== 'UK') {
    return net * (1 + VATRates[country]) * (1 + VATRates[country]);
  }
  return net * (1 + VATRates[country]);
};
