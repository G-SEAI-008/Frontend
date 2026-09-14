// oxlint-disable vitest/prefer-expect-assertions vitest/require-top-level-describe

import { describe, expect, test } from 'vitest';

import { calculateTotal } from '../checkout';

describe('calculate Total', () => {
  test('calculate the total sum', () => {
    const result = calculateTotal(100, 'UK');
    // console.log('Ergebnise für UK', result);
    expect(result).toBe(120);
  });

  test('berechne den Gesamtpreis für Frankreich', () => {
    const result = calculateTotal(100, 'FR');
    expect(result).toBe(120);
  });

  test('berechne den Gesamtpreis für Deutschland', () => {
    const result = calculateTotal(100, 'DE');
    expect(result).toBe(119);
  });
});

// UK: 100 x 1.20 = 120
// FR: 100 x 1.20 x 1.20 = 144
// DE: 100 x 1.19 x 1.19 = 141.610
