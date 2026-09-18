// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für die Lernbeispiele.
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { auth, events, user } from '../../test-utils/fixtures';
import { renderApp } from '../../test-utils/renderApp';

function enterCredentials(password = 'password123') {
  fireEvent.change(screen.getByLabelText('Email address'), { target: { value: user.email } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: password } });
}

describe('auth flow: echte Formulare, Actions, Provider und Routen', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('fetch', vi.fn<typeof fetch>());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  test('meldet sich an, zeigt den geschützten Bereich und meldet sich wieder ab', async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(auth))
      .mockResolvedValueOnce(Response.json(user))
      .mockResolvedValueOnce(Response.json(events));
    const router = renderApp('/login');

    enterCredentials();
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    const welcome = await screen.findByText('Welcome back, Ada!');
    expect(welcome).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/app');

    // Die App hat eine Desktop-Navigation und eine mobile Seitenleiste.
    fireEvent.click(screen.getAllByRole('button', { name: 'Log out' })[0]);

    const loginHeading = await screen.findByRole('heading', { name: 'Sign in to your account' });
    expect(loginHeading).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  test('registriert einen Nutzer und leitet zum Login weiter', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(Response.json(user));
    const router = renderApp('/register');

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Ada' } });
    enterCredentials();
    fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));

    const heading = await screen.findByRole('heading', { name: 'Sign in to your account' });
    expect(heading).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/login');
    expect(fetch).toHaveBeenCalledExactlyOnceWith('http://localhost:3001/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Ada', email: user.email, password: 'password123' }),
    });
  });

  test('zeigt eine abgelehnte Anmeldung und bleibt im Login', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      Response.json({ error: 'Wrong password' }, { status: 401 }),
    );
    const router = renderApp('/login');
    enterCredentials();
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    const error = await screen.findByText('Wrong password');
    expect(error).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/login');
    expect(localStorage.getItem('token')).toBeNull();
  });

  test('prüft die Eingabe mit Zod, bevor eine Anfrage gesendet wird', async () => {
    renderApp('/login');
    enterCredentials('short');
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));

    const error = await screen.findByText(/Password must be at least 8 characters long/u);
    expect(error).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  test('schickt einen Gast vom geschützten Bereich zum Login', async () => {
    // Der Router lädt die Eventdaten unabhängig vom anschließenden UI-Redirect.
    vi.mocked(fetch).mockResolvedValueOnce(Response.json(events));
    const router = renderApp('/app');

    const heading = await screen.findByRole('heading', { name: 'Sign in to your account' });
    expect(heading).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/login');
  });

  test('stellt eine Sitzung über den gespeicherten Token wieder her', async () => {
    localStorage.setItem('token', 'test-token');
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(events))
      .mockResolvedValueOnce(Response.json(user));
    renderApp('/app');

    const welcome = await screen.findByText('Welcome back, Ada!');
    expect(welcome).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/auth/profile', {
      headers: { Authorization: 'Bearer test-token' },
    });
    expect(localStorage.getItem('user')).toContain(user.email);
  });

  test('entfernt eine abgelaufene Sitzung, wenn die API den Token ablehnt', async () => {
    localStorage.setItem('token', 'expired-token');
    localStorage.setItem('user', JSON.stringify(user));
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json(events))
      .mockResolvedValueOnce(Response.json({ message: 'Token expired' }, { status: 401 }));
    const router = renderApp('/app');

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/login');
    });
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
