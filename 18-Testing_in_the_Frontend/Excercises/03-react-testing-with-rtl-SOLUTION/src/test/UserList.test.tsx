// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für diese Lernbeispiele.
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import UserList from '../components/UserList';

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', username: 'alice' },
  { id: 2, name: 'Bob', email: 'bob@example.com', username: 'bob' },
];

describe('userList', () => {
  beforeEach(() => {
    // Jeder Test bekommt einen eigenen Fetch-Mock mit gültigen API-Daten.
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockResolvedValue(Response.json(users)));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('zeigt zuerst den Ladezustand und danach die geladenen Nutzer', async () => {
    render(<UserList />);

    expect(screen.getByText('Loading users...')).toBeInTheDocument();
    const alice = await screen.findByText('Alice');

    expect(alice).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('filtert unabhängig von Großschreibung und kann die Suche löschen', async () => {
    render(<UserList />);
    const input = await screen.findByPlaceholderText('Search users...');
    const clear = screen.getByRole('button', { name: '×' });

    expect(clear).toBeDisabled();
    fireEvent.change(input, { target: { value: 'ALICE' } });

    expect(screen.getByText('Alice', { selector: 'mark' })).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();

    fireEvent.click(clear);

    expect(input).toHaveValue('');
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  test('zeigt einen Hinweis bei einer Suche ohne Treffer', async () => {
    render(<UserList />);
    const input = await screen.findByPlaceholderText('Search users...');

    fireEvent.change(input, { target: { value: 'Nobody' } });

    expect(screen.getByText('No users found matching your search.')).toBeInTheDocument();
  });

  test('zeigt einen Netzwerkfehler und lädt nach Retry erneut', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Keine Verbindung'));
    render(<UserList />);

    const errorMessage = await screen.findByText('Keine Verbindung');

    expect(errorMessage).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    const alice = await screen.findByText('Alice');

    expect(alice).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test('lädt die Nutzer beim Klick auf Refresh erneut', async () => {
    render(<UserList />);
    const refresh = await screen.findByRole('button', { name: 'Refresh' });

    // Die erste Response wurde schon gelesen; Refresh bekommt eine neue.
    vi.mocked(fetch).mockResolvedValueOnce(Response.json(users));
    fireEvent.click(refresh);

    const alice = await screen.findByText('Alice');

    expect(alice).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test('zeigt einen Fehler, wenn die API-Daten nicht zum Zod-Schema passen', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      Response.json([{ id: '1', name: 'Alice', email: 'alice@example.com', username: 'alice' }]),
    );
    render(<UserList />);

    const retry = await screen.findByRole('button', { name: 'Retry' });

    expect(retry).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
