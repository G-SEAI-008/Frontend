// oxlint-disable vitest/prefer-expect-assertions
import { describe, test, expect } from 'vitest';

describe('eine Gruppe zusammengehöriger Tests', () => {
  test('vergleicht einen tatsächlichen Wert mit einem erwarteten Wert', () => {
    const actual = 1 + 2;

    expect(actual).toBe(3);
  });
});

// test === it
