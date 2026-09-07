'use client';

import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

const ErrorPage = ({ error, retry }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className='grid place-items-center gap-4 py-24 text-center'>
      <h1 className='text-2xl font-bold text-red-700'>Something went wrong</h1>
      <p>{"We couldn't load this page. Please try again."}</p>
      <pre className='max-w-full overflow-auto text-left'>{error.message}</pre>
      <button
        type='button'
        className='button'
        onClick={retry}
      >
        Try again
      </button>
    </section>
  );
};

export default ErrorPage;
