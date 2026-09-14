// oxlint-disable vitest/prefer-expect-assertions vitest/require-top-level-describe
import { expect, test } from 'vitest';

import { sum } from './sum';

test('addiert 1 und 2 zu 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// toBe() (===)
