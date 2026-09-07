'use client';

import { useEffect } from 'react';

import './globals.css';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

// Dieser Fallback ersetzt auch das Root Layout und braucht deshalb html und body.
const GlobalError = ({ error, retry }: GlobalErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang='en'>
      <body className='bg-white font-sans text-black'>
        <main className='grid min-h-svh place-content-center gap-4 p-4 text-center'>
          <h1 className='text-2xl font-bold text-red-700'>Something went wrong</h1>
          <p>We couldn't load the application. Please try again.</p>
          <pre className='max-w-full overflow-auto text-left'>{error.message}</pre>
          <button type='button' className='button' onClick={retry}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
