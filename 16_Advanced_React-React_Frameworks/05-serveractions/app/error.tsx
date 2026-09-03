'use client';

type ErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

const ErrorPage = ({ error, retry }: ErrorProps) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='mb-2 text-2xl font-bold text-red-700'>Something went wrong!</h2>
      <p className='mb-4 text-red-600'>Error: {error.message}</p>
      <button
        className='cursor-pointer rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700'
        onClick={() => {
          retry();
        }}
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
