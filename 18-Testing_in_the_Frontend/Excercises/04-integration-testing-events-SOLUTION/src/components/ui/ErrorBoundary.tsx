import { isRouteErrorResponse, Navigate, useRouteError } from 'react-router';

const ErrorBoundary = () => {
  const error = useRouteError();
  const isResponseError = isRouteErrorResponse(error);

  if (isResponseError && error.status === 404) {
    return <Navigate to='/' replace />;
  }
  return (
    <div className='absolute inset-0 flex flex-col items-center justify-center'>
      <h1 className='bg-linear-to-r from-[#6054e8] to-[#f8485e] bg-clip-text text-4xl font-extrabold text-transparent lg:text-6xl'>
        {isResponseError ? error.status : 'An Error Occurred'}
      </h1>
      <p className='text-base-content text-2xl font-bold'>
        {isResponseError
          ? error.data
          : error instanceof Error
            ? error.message
            : 'Something went very wrong'}
        &nbsp;
        <span aria-hidden='true'>😢</span>
      </p>
    </div>
  );
};
export default ErrorBoundary;
