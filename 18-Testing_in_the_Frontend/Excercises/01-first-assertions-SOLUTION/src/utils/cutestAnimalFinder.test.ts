// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für diese Lernbeispiele.
import { describe, expect, test } from 'vitest';

import { findCutestAnimal } from './cutestAnimalFinder';

describe('find Cutest Animal', () => {
  test('findet das Tier mit dem höchsten Wert', () => {
    const cat = { name: 'Fluffy', species: 'cat', cuteness: 8.5 };
    const dog = { name: 'Buddy', species: 'dog', cuteness: 9.2 };

    expect(findCutestAnimal([cat, dog])).toBe(dog);
  });

  test('behält bei Gleichstand das erste Tier', () => {
    const cat = { name: 'Fluffy', species: 'cat', cuteness: 9 };
    const dog = { name: 'Buddy', species: 'dog', cuteness: 9 };

    expect(findCutestAnimal([cat, dog])).toBe(cat);
  });

  test('liefert null für eine leere Liste', () => {
    expect(findCutestAnimal([])).toBeNull();
  });
});
