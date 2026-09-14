// oxlint-disable vitest/prefer-expect-assertions vitest/require-top-level-describe
import { expect, test } from 'vitest';

import { sum } from './utils/sum';

// Small, case-sensitive demo for words such as 'madam' and 'hello'.
const isPalindrome = (input: string) => {
  let reversed = '';
  for (const character of input) {
    reversed = character + reversed;
  }
  return input === reversed;
};

// # These small examples teach the matchers, so some values are deliberately literal.
test('vergleicht primitive Werte mit toBe', () => {
  expect(sum(1, 2)).toBe(3);
});

test('vergleicht Objektinhalte mit toEqual', () => {
  const user = { name: 'Alice', age: 28 };

  expect(user).toStrictEqual({ name: 'Alice', age: 28 });

  // * Besteht: toEqual ignoriert hier die zusätzliche Eigenschaft mit undefined.
  // expect({ name: 'Alice', age: undefined }).toEqual({ name: 'Alice' });
  // * Schlägt fehl: toStrictEqual unterscheidet zwischen fehlend und undefined.
  // expect({ name: 'Alice', age: undefined }).toStrictEqual({ name: 'Alice' });
});

test('vergleicht Gleitkommazahlen mit toBeCloseTo', () => {
  // JavaScript cannot represent every decimal exactly: 0.1 + 0.2 !== 0.3.
  expect(0.1 + 0.2).toBeCloseTo(0.3);
});

// * `toBe(true)`: Ist der Wert exakt der Boolean true?
// * `toBeTruthy()`: Würde der Wert in einer if-Bedingung als wahr gelten?
test('vergleicht Boolean-Werte mit toBe', () => {
  const user = { active: true, admin: false };

  expect(user.active).toBe(true);
  expect(user.admin).toBe(false);
});

test('prüft truthy und falsy Werte', () => {
  expect(isPalindrome('otto')).toBeTruthy();
  expect(isPalindrome('hallo')).toBeFalsy();
  expect('hallo').toBeTruthy();
  expect('').toBeFalsy();
});

test('prüft, ob ein Array einen Wert enthält', () => {
  expect([1, 2, 3]).toContain(2);
  expect([1, 2, 3]).not.toContain(9);
});

test('prüft die Länge eines Arrays', () => {
  expect([1, 2, 3]).toHaveLength(3);
});

test('prüft Text mit einem regulären Ausdruck', () => {
  expect('Hallo Berlin').toMatch(/Berlin/u);
});
