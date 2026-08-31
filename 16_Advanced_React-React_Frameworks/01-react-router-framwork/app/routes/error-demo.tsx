// oxlint-disable import/exports-last
import { isRouteErrorResponse } from 'react-router';

import type { Product } from '~/components/Products';

import type { Route } from './+types/error-demo';

// oxlint-disable typescript/require-await typescript/only-throw-error
export const loader = async () => {
  const res = await fetch('https://fakestoreapi.com/quatsch');

  console.log('Ich bin im loader()');

  if (!res.ok) {
    throw new Response('Failed to fetch', {
      status: res.status,
      statusText: res.statusText,
    });
  }

  return res.json() as Promise<Product[]>;
};

// throw new Response('Failed to fetch', ...)
//                            ↓
// error.status      → zum Beispiel 404
// error.statusText  → zum Beispiel "Not Found"
// error.data        → "Failed to fetch"

const ErrorDemo = ({ loaderData }: Route.ComponentProps) => {
  console.log('Fetch war erfolgreich');
  console.log(loaderData);
  return (
    <div>
      <h2>Error Demo</h2>
      <p>This will never render!</p>
    </div>
  );
};

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  if (isRouteErrorResponse(error)) {
    return (
      <div role='alert'>
        <h2>
          {error.status} {error.statusText || 'Request failed'}
        </h2>
        <p>{typeof error.data === 'string' ? error.data : JSON.stringify(error.data)}</p>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div role='alert'>
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return <p role='alert'>Unknown error</p>;
};

export default ErrorDemo;
