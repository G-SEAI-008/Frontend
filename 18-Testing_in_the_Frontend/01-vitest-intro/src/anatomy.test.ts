// oxlint-disable vitest/expect-expect vitest/prefer-expect-assertions
import { describe, expect, test, it } from 'vitest';

describe('eine Gruppe zusammengehöriger Tests', () => {
  test('vergleicht einen tatsächlichen wert mit einem erwarteten Wert', () => {
    const actual = 1 + 2;

    expect(actual).toBe(3);
  });
});

// test === it
