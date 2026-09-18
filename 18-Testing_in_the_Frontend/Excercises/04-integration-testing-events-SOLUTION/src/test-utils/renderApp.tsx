import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import { AuthProvider } from '../contexts';
import routes from '../routes';

export function renderApp(path: string) {
  // Dieselben Routen wie in App.tsx, nur mit einer URL im Arbeitsspeicher.
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>,
  );
  return router;
}
