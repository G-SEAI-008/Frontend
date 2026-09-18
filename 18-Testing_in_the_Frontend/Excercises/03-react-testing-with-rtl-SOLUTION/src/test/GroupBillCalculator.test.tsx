// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für diese Lernbeispiele.
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import GroupBillCalculator from '../components/GroupBillCalculator';
// oxlint-disable-next-line import/no-namespace -- spyOn braucht das Modulobjekt und den Funktionsnamen.
import * as billCalculator from '../utils/groupBillCalculator';

describe('groupBillCalculator: Mock', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('übergibt die Eingaben und zeigt das vorgegebene Ergebnis', async () => {
    // mockReturnValue ersetzt die Berechnung. Die echte Funktion läuft hier nicht.
    const calculate = vi.spyOn(billCalculator, 'calculateGroupBill').mockReturnValue({
      subtotal: 100,
      tipAmount: 20,
      total: 120,
      perPerson: 42,
    });

    render(<GroupBillCalculator />);
    fireEvent.change(screen.getByLabelText('Rechnungsbetrag'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Trinkgeld in Prozent'), { target: { value: '20' } });
    fireEvent.change(screen.getByLabelText('Personen'), { target: { value: '4' } });
    fireEvent.click(screen.getByRole('button', { name: 'Berechnen' }));

    const result = await screen.findByText('Pro Person: 42.00 €');

    expect(result).toBeInTheDocument();
    expect(calculate).toHaveBeenCalledExactlyOnceWith([100], 20, 4);
  });
});
