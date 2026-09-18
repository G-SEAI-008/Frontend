// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für die Lernbeispiele.
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { user } from '../test-utils/fixtures';
import { loginAction, registerAction } from './auth';
import { createEventAction } from './events';

function formRequest(fields: Record<string, string>) {
  return new Request('http://localhost:3000/app', {
    method: 'POST',
    body: new URLSearchParams(fields),
  });
}

describe('actions: Validierung und Fehlerantworten', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn<typeof fetch>());
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  test('meldet einen Netzwerkfehler beim Login', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Offline'));
    const request = formRequest({ email: user.email, password: 'password123' });

    const result = await loginAction({ request });

    expect(result).toStrictEqual({ error: 'Offline' });
  });

  test('lehnt eine Registrierung ohne Namen ab', async () => {
    const request = formRequest({ name: '', email: user.email, password: 'password123' });

    const result = await registerAction({ request });

    expect(result).toHaveProperty('error', expect.stringContaining('Name is required'));
    expect(fetch).not.toHaveBeenCalled();
  });

  test('gibt einen Registrierungsfehler der API zurück', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      Response.json({ error: 'Email already exists' }, { status: 409 }),
    );
    const request = formRequest({ name: 'Ada', email: user.email, password: 'password123' });

    const result = await registerAction({ request });

    expect(result).toStrictEqual({ error: 'Email already exists' });
  });

  test('lehnt unvollständige Eventdaten ab', async () => {
    const request = formRequest({ title: '' });

    const result = await createEventAction({ request });

    expect(result).toHaveProperty('error', expect.stringContaining('Title is required'));
    expect(fetch).not.toHaveBeenCalled();
  });

  test('meldet eine fehlgeschlagene Event-Erstellung statt eines Erfolgs', async () => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'test-token');
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 500 }));
    const request = formRequest({
      title: 'React Meetup',
      description: '',
      date: '2026-10-01T18:00',
      location: 'Berlin',
      latitude: '52.52',
      longitude: '13.405',
    });

    const result = await createEventAction({ request });

    expect(result).toStrictEqual({ error: 'Failed to create event' });
  });
});
