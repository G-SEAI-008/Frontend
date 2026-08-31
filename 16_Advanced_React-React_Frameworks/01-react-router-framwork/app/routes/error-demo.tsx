import type { Route } from './+types/error-demo';

// oxlint-disable typescript/require-await typescript/only-throw-error
const loader = async () => {
  const res = await fetch('https://fakestoreapi.com/products');

  console.log('Ich bin im loader()');

  if (!res.ok) {
    throw new Response('Failed to fetch', { status: res.status });
    //  { status: res.status } bspw.  { status: 404 }
  }

  return res.json();
};

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

const ErrorBoundary = () => {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>Could not load the data</p>
    </div>
  );
};

export default ErrorDemo;
export { loader, ErrorBoundary };
