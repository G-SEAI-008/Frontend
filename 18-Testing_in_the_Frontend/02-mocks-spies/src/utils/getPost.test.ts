// oxlint-disable vitest/prefer-expect-assertions
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { ZodError } from 'zod';

import { getPost } from './getPost';

const mockPost = { id: 1, title: 'Post 1', body: 'Body 1' };

describe('get Post', () => {
  // Hooks zeigen hier ausdrücklich das Vorbereiten und aufraumen der Testumgebung
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockResolvedValue(Response.json(mockPost)));
    const consoleSpy = vi.spyOn(console, 'log');
    // const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals(); // Stellt das ursprüngliche fetch wieder her.
    vi.restoreAllMocks(); //  Stellt die mit spyOn ersetzten Metohden wieder her.
  });

  test('liefert den geladenen Beitrag', async () => {
    const result = await getPost(1);

    expect(result).toStrictEqual(mockPost);
    // expect(result.title).toBe('Post 1');
  });

  test('ruft die richtige URL', async () => {
    await getPost(1);
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');
  });

  test('lehnt eine erfolgreiche HTTP-Antwort ab', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(null, { status: 404, statusText: 'Not Found' }),
    );

    await expect(getPost(99)).rejects.toThrow('Netzwerkfehler: 404 Not Found');
  });

  test('gibt einen Verbindungsfehler weiter', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new TypeError('Keine Verbindung'));

    await expect(getPost(1)).rejects.toThrow('Keine Verbindung');
  });

  test('lehnt API-Daten mit einem falsch benannten Feld ab', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      Response.json({ id: 1, title: 'Post 1', Body: 'Body 1' }),
    );

    await expect(getPost(1)).rejects.toThrow(ZodError);
  });

  test('protokolliert die angefragte Beitrags-ID', async () => {
    await getPost(2);

    expect(console.log).toHaveBeenCalledExactlyOnceWith('Lade Beitrag mit ID: 2');
  });
});
