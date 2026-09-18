// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für die Lernbeispiele.
import { fireEvent, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { event, events, user } from '../../test-utils/fixtures';
import { renderApp } from '../../test-utils/renderApp';

describe('weitere Seiten und Event-Erstellung', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('fetch', vi.fn<typeof fetch>());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  test('lädt die Startseite und ihre beiden Kennzahlen', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json({ totalCount: 12 }))
      .mockResolvedValueOnce(Response.json({ totalCount: 34 }));
    renderApp('/');

    const heading = await screen.findByRole('heading', { name: 'Welcome to Venued' });
    expect(heading).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('34')).toBeInTheDocument();
  });

  test('zeigt unbekannte URLs als 404-Seite und navigiert über die Seitenleiste', async () => {
    renderApp('/missing');
    expect(screen.getByRole('heading', { name: 'Page Not Found' })).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('link', { name: 'Login' })[1]);

    const heading = await screen.findByRole('heading', { name: 'Sign in to your account' });
    expect(heading).toBeInTheDocument();
  });

  test('zeigt den Router-Fehlerzustand bei einem fehlgeschlagenen Loader', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 500 }));
    renderApp('/events');

    const error = await screen.findByText('Failed to fetch events');
    expect(error).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'An Error Occurred' })).toBeInTheDocument();
  });

  test('erstellt im geschützten Bereich ein Event und aktualisiert die Liste', async () => {
    localStorage.setItem('token', 'test-token');
    const newEvent = { ...event, id: 2, title: 'Vitest Workshop' };
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(events))
      .mockResolvedValueOnce(Response.json(user))
      .mockResolvedValueOnce(Response.json(newEvent, { status: 201 }))
      .mockResolvedValueOnce(
        Response.json({ ...events, results: [event, newEvent], totalCount: 2 }),
      );
    renderApp('/app');
    const open = await screen.findByRole('button', { name: 'Create New Event' });
    fireEvent.click(open);
    const dialog = screen.getByRole('dialog');

    fireEvent.change(within(dialog).getByLabelText('Event Title'), {
      target: { value: 'Vitest Workshop' },
    });
    fireEvent.change(within(dialog).getByLabelText('Description'), {
      target: { value: 'Tests gemeinsam schreiben' },
    });
    fireEvent.change(within(dialog).getByLabelText('Date & Time'), {
      target: { value: '2026-10-01T18:00' },
    });
    fireEvent.change(within(dialog).getByLabelText('Location'), { target: { value: 'Berlin' } });
    fireEvent.change(within(dialog).getByLabelText('Latitude'), { target: { value: '52.52' } });
    fireEvent.change(within(dialog).getByLabelText('Longitude'), { target: { value: '13.405' } });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Create Event' }));

    const title = await screen.findByRole('heading', { name: 'Vitest Workshop' });
    expect(title).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/api/events',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer test-token' },
      }),
    );
  });
});
