// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für diese Lernbeispiele.
import { describe, expect, test } from 'vitest';

import { fetchRandomCatFact } from './catFactFetcher';

describe('fetch Random Cat Fact', () => {
  test('liefert nach einer kurzen Wartezeit einen nicht leeren Text', async () => {
    // await ist wichtig: Vitest soll auf das Ergebnis und die Assertion warten.
    await expect(fetchRandomCatFact()).resolves.toMatch(/.+/u);
  });

  test('liefert ohne Rasseinfos einen der allgemeinen Fakten', async () => {
    const fact = await fetchRandomCatFact(false);
    const generalFacts = [
      'Cats sleep 12-16 hours per day',
      'A group of cats is called a clowder',
      'Cats have five toes on their front paws but only four on their back paws',
      'Cats can rotate their ears 180 degrees',
      "A cat's purr vibrates at a frequency that promotes bone healing",
    ];

    expect(generalFacts).toContain(fact);
  });
});
