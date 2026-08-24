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
  // TypeScript inferiert den Typ automatisch aus dem Initialwert (number)
  const [counter, setCounter] = useState(0);

  // const [users, setUsers] = useState([] as User[]); // Alternative: Type Assertion mit 'as'
  const [users, setUsers] = useState<User[]>([]); // Explizite Typisierung mit Generic <User[]>

  // TypeScript inferiert automatisch boolean
  const [loading, setLoading] = useState(true);

  // Union Type: State kann null ODER string sein
  const [error, setError] = useState<null | string>(null);

  // Generic mit importiertem Type ('unset' | 'loading' | 'success' | 'error')
  const [status, setStatus] = useState<ComponentStatus>('unset');

  useEffect(() => {
    setStatus('loading');
    // fetch...
    setUsers(userArr);
    setStatus('success');
  }, []);

  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>{user.username}</p>
      ))}
    </div>
  );
};

export default UserList;
