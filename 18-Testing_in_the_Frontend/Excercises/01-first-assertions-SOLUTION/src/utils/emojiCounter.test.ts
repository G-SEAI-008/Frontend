// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für diese Lernbeispiele.
import { describe, expect, test } from 'vitest';

import { countEmojisInMessage } from './emojiCounter';

describe('count Emojis In Message', () => {
  test('zählt einfache Emojis in einem Text', () => {
    expect(countEmojisInMessage('Pizza 🍕 und Eis 🍦')).toBe(2);
  });

  test('zählt normale Zeichen und Emoticons nicht mit', () => {
    expect(countEmojisInMessage('Hallo :) 123')).toBe(0);
  });

  test('liefert null Emojis für einen leeren Text', () => {
    expect(countEmojisInMessage('')).toBe(0);
  });

  // Bekannte Grenze des Starters: Die Regex zählt die Teile dieses Emojis einzeln.
  // test.fails erwartet einen Fehlschlag. Ohne .fails wird der Fehler sichtbar rot.
  test.fails('zählt ein zusammengesetztes Familien-Emoji als ein Emoji', () => {
    expect(countEmojisInMessage('👨‍👩‍👧‍👦')).toBe(1);
  });
});
