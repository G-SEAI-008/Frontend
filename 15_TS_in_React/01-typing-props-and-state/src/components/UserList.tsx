/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';

import type { ComponentStatus, User } from '../types';

const userArr: User[] = [
  {
    id: 1,
    username: 'Guybrush',
    info: 'alert',
  },
  {
    id: 2,
    username: 'Anakin',
    info: 'failure',
  },
];

const UserList = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<ComponentStatus>('unset'); // "unset" | "loading" | "success" | "error"

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsers(userArr);
    setStatus('success');
    setError(null);
    setLoading((prev) => !prev);
    setError('Fetch failed');
  }, []);

  return (
    <div>
      {users?.map((user) => (
        <p key={user.id}>{user.info}</p>
      ))}
    </div>
  );
};

export default UserList;
