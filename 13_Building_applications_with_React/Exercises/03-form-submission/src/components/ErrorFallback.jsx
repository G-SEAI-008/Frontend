const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className='alert alert-error flex w-lg flex-col items-start gap-2'>
    <span className='font-semibold'>There was an error while submitting the form:</span>
    <pre className='text-sm whitespace-pre-wrap'>{error.message}</pre>
    <button onClick={resetErrorBoundary} className='btn btn-warning btn-sm' type='button'>
      Retry
    </button>
  </div>
);

export default ErrorFallback;
