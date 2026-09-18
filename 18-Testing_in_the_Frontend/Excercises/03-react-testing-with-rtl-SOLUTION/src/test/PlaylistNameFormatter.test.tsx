// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für diese Lernbeispiele.
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import PlaylistNameFormatter from '../components/PlaylistNameFormatter';
// oxlint-disable-next-line import/no-namespace -- spyOn braucht das Modulobjekt und den Funktionsnamen.
import * as playlistFormatter from '../utils/playlistNameFormatter';

describe('playlistNameFormatter: Spy', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('ruft die echte Formatierung auf und zeigt ihr Ergebnis', () => {
    // Ohne mockReturnValue beobachtet der Spy nur: Die echte Funktion läuft weiter.
    const format = vi.spyOn(playlistFormatter, 'formatPlaylistName');

    render(<PlaylistNameFormatter />);
    fireEvent.change(screen.getByLabelText('Playlist-Name'), {
      target: { value: '  my ROCK! playlist  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Formatieren' }));

    expect(format).toHaveBeenCalledExactlyOnceWith('  my ROCK! playlist  ');
    expect(screen.getByText('My Rock Playlist')).toBeInTheDocument();
  });
});
