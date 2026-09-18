import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  username: z.string(),
});

type User = z.infer<typeof UserSchema>;

const highlightMatch = (text: string, searchTerm: string) => {
  if (!searchTerm) {
    return text;
  }

  const regex = new RegExp(
    // oxlint-disable-next-line require-unicode-regexp
    `(${searchTerm.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`)})`,
    'giu',
  );

  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      // oxlint-disable-next-line react/no-array-index-key
      <mark key={index} className='bg-warning text-warning-content rounded'>
        {part}
      </mark>
    ) : (
      part
    ),
  );
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = useCallback(async (signal?: AbortSignal) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        signal,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      // JSON kommt von außen: TypeScript prüft seinen Inhalt nicht.
      const data: unknown = await response.json();
      const parsedUsers = z.array(UserSchema).parse(data);
      setUsers(parsedUsers);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }

      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  function reloadUsers() {
    setLoading(true);
    setError(null);
    void fetchUsers();
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    // oxlint-disable-next-line react/set-state-in-effect -- Die Zustandsupdates in fetchUsers folgen erst nach await.
    void fetchUsers(signal);

    return () => {
      controller.abort();
    };
  }, [fetchUsers]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className='card bg-base-100 shadow-xl'>
        <div className='card-body items-center'>
          <span className='loading loading-spinner loading-lg' />
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='card bg-base-100 shadow-xl'>
        <div className='card-body items-center'>
          <div className='alert alert-error'>
            <span>{error}</span>
          </div>
          <button className='btn btn-primary mt-4' onClick={reloadUsers}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='card bg-base-100 shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title'>User Directory</h2>
        <div className='mb-4 w-full'>
          <div className='join join-item'>
            <input
              type='text'
              placeholder='Search users...'
              className='input w-full'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <button
              className='btn join-item'
              disabled={!searchTerm}
              onClick={() => {
                setSearchTerm('');
              }}
            >
              &times;
            </button>
          </div>
        </div>
        {filteredUsers.length === 0 ? (
          <div className='py-8 text-center'>
            <p>No users found matching your search.</p>
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='table-zebra table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{highlightMatch(user.name, searchTerm)}</td>
                    <td>@{highlightMatch(user.username, searchTerm)}</td>
                    <td>{highlightMatch(user.email, searchTerm)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className='card-actions mt-4 justify-end'>
          <button className='btn btn-outline' onClick={reloadUsers}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;
