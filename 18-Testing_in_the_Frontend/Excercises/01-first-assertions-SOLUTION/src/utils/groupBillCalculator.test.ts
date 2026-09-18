// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für diese Lernbeispiele.
import { describe, expect, test } from 'vitest';

import { calculateGroupBill } from './groupBillCalculator';

describe('calculate Group Bill', () => {
  test('addiert Preise und Trinkgeld und teilt die Rechnung', () => {
    const result = calculateGroupBill([20, 30], 10, 2);

    expect(result).toStrictEqual({ subtotal: 50, tipAmount: 5, total: 55, perPerson: 27.5 });
  });

  test('rundet den Anteil pro Person auf zwei Nachkommastellen', () => {
    expect(calculateGroupBill([10], 0, 3).perPerson).toBeCloseTo(3.33);
  });

  test('lehnt eine Gruppe mit null Personen ab', () => {
    // toThrow braucht eine Funktion, damit Vitest den Fehler auffangen kann.
    expect(() => calculateGroupBill([20], 10, 0)).toThrow(
      'Cannot split bill between 0 or negative people',
    );
  });

  test('lehnt negative Preise ab', () => {
    expect(() => calculateGroupBill([-5], 0, 2)).toThrow('Item prices cannot be negative');
  });
});
