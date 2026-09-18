// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für diese Lernbeispiele.
import { describe, expect, test } from 'vitest';

import { formatPlaylistName } from './playlistNameFormatter';

describe('format Playlist Name', () => {
  test('bereinigt den Namen und schreibt Wortanfänge groß', () => {
    expect(formatPlaylistName('  my   ROCK! playlist  ')).toBe('My Rock Playlist');
  });

  test('kann den gesamten Namen großschreiben', () => {
    expect(formatPlaylistName('hip-hop vibes', 'upper')).toBe('HIP-HOP VIBES');
  });

  test('kann den gesamten Namen kleinschreiben', () => {
    expect(formatPlaylistName('ROCK CLASSICS', 'lower')).toBe('rock classics');
  });

  test('kann nur den Satzanfang großschreiben', () => {
    expect(formatPlaylistName('ROCK CLASSICS', 'sentence')).toBe('Rock classics');
  });

  test('liefert einen Ersatznamen für eine leere Eingabe', () => {
    expect(formatPlaylistName('')).toBe('Untitled Playlist');
  });
});
