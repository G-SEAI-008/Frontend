// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für diese Lernbeispiele.
import { describe, expect, test } from 'vitest';

import { validatePizzaOrder } from './pizzaOrderValidator';

describe('validate Pizza Order', () => {
  test('akzeptiert eine gültige Bestellung ab fünf Jahren', () => {
    expect(validatePizzaOrder('small', ['cheese'], 5)).toStrictEqual({ isValid: true });
  });

  test('lehnt eine unbekannte Größe ab', () => {
    expect(validatePizzaOrder('huge', ['cheese'], 20)).toStrictEqual({
      isValid: false,
      error: 'Invalid pizza size',
    });
  });

  test('lehnt zu junge Kunden ab', () => {
    expect(validatePizzaOrder('small', [], 4)).toStrictEqual({
      isValid: false,
      error: 'Customer too young',
    });
  });

  test('lehnt mehr als zehn Beläge ab', () => {
    const toppings = Array.from({ length: 11 }, () => 'cheese');

    expect(validatePizzaOrder('large', toppings, 20)).toStrictEqual({
      isValid: false,
      error: 'Too many toppings',
    });
  });

  test('lehnt Ananas zusammen mit Schinken ab', () => {
    expect(validatePizzaOrder('large', ['pineapple', 'ham'], 20)).toStrictEqual({
      isValid: false,
      error: 'Pineapple and ham cannot be combined',
    });
  });
});
