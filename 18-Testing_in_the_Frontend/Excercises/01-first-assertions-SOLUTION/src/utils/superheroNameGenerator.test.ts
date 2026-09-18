// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für diese Lernbeispiele.
import { describe, expect, test } from 'vitest';

import { generateSuperheroName } from './superheroNameGenerator';

describe('generate Superhero Name', () => {
  test('kombiniert standardmäßig zwei Wörter', () => {
    expect(generateSuperheroName()).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+$/u);
  });

  test('kann einen Titel voranstellen', () => {
    expect(generateSuperheroName(true)).toMatch(
      /^(?<title>Captain|Doctor|Professor|Agent|Master|Lady|Sir) [A-Z][a-z]+ [A-Z][a-z]+$/u,
    );
  });
});
