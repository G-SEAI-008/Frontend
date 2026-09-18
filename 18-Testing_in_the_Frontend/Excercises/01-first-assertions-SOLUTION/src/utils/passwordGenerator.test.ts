// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für diese Lernbeispiele.
import { describe, expect, test } from 'vitest';

import { generateSecurePassword } from './passwordGenerator';

describe('generate Secure Password', () => {
  test('liefert die gewünschte Länge und nur erlaubte Zeichen', () => {
    const password = generateSecurePassword(12);

    expect(password).toHaveLength(12);
    // Zufällige Auswahl: Nicht jedes Passwort muss jede Zeichenart enthalten.
    expect(password).toMatch(/^[A-Za-z0-9]+$/u);
  });

  test('kann ausschließlich Ziffern verwenden', () => {
    const password = generateSecurePassword(8, {
      includeUppercase: false,
      includeLowercase: false,
    });

    expect(password).toMatch(/^[0-9]{8}$/u);
  });

  test('lehnt zu kurze Passwörter ab', () => {
    expect(() => generateSecurePassword(3)).toThrow(
      'Password length must be at least 4 characters',
    );
  });

  test('lehnt eine Auswahl ohne erlaubte Zeichen ab', () => {
    expect(() =>
      generateSecurePassword(8, {
        includeUppercase: false,
        includeLowercase: false,
        includeNumbers: false,
        includeSymbols: false,
      }),
    ).toThrow('At least one character type must be enabled');
  });
});
