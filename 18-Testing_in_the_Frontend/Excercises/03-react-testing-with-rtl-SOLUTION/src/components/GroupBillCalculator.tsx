import { useState } from 'react';
import { z } from 'zod';

import { calculateGroupBill } from '../utils/groupBillCalculator';

const BillInputSchema = z.object({
  amount: z.coerce.number().nonnegative(),
  tip: z.coerce.number().nonnegative(),
  people: z.coerce.number().int().positive(),
});

export default function GroupBillCalculator() {
  const [perPerson, setPerPerson] = useState<number | null>(null);
  const [error, setError] = useState('');

  function handleSubmit(formData: FormData) {
    // FormData liefert Strings. Zod wandelt sie um und prüft die Zahlen.
    const input = BillInputSchema.safeParse({
      amount: formData.get('amount'),
      tip: formData.get('tip'),
      people: formData.get('people'),
    });

    if (!input.success) {
      setError('Bitte gültige Beträge und mindestens eine Person eingeben.');
      setPerPerson(null);

      return;
    }

    const { amount, tip, people } = input.data;
    const result = calculateGroupBill([amount], tip, people);

    setError('');
    setPerPerson(result.perPerson);
  }

  return (
    <section className='card bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>Rechnung teilen</h2>
        <form action={handleSubmit} className='grid gap-3'>
          <label htmlFor='bill-amount'>Rechnungsbetrag</label>
          <input
            id='bill-amount'
            name='amount'
            type='number'
            min='0'
            step='0.01'
            defaultValue='50'
            required
            className='input w-full'
          />
          <label htmlFor='bill-tip'>Trinkgeld in Prozent</label>
          <input
            id='bill-tip'
            name='tip'
            type='number'
            min='0'
            step='0.1'
            defaultValue='10'
            required
            className='input w-full'
          />
          <label htmlFor='bill-people'>Personen</label>
          <input
            id='bill-people'
            name='people'
            type='number'
            min='1'
            step='1'
            defaultValue='2'
            required
            className='input w-full'
          />
          <button type='submit' className='btn btn-primary'>
            Berechnen
          </button>
        </form>
        {error && <p role='alert'>{error}</p>}
        {perPerson !== null && <p>Pro Person: {perPerson.toFixed(2)} €</p>}
      </div>
    </section>
  );
}
