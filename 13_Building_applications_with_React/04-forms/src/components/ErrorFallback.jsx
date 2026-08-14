const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className='rounded border border-red-300 bg-red-100 p-4 text-red-700'>
    <p className='font-semibold'>There was an error while submitting the form:</p>
    <pre className='mt-2 text-sm'>{error.message}</pre>
    <button
      onClick={resetErrorBoundary}
      className='mt-2 rounded bg-red-600 px-4 py-1 text-sm text-white hover:bg-red-700'
    >
      Retry
    </button>
  </div>
);

export default ErrorFallback;
