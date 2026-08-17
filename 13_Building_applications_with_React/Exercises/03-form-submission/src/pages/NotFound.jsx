import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <img src='/404.gif' alt='404 Not Found' className='mb-6 h-64 w-64' />
      <h1 className='text-error mb-2 text-4xl font-bold'>Page Not Found</h1>
      <p className='text-base-content mb-6 text-lg'>
        Sorry, the page you are looking for doesn't exist.
      </p>
      <Link to='/' className='btn btn-primary'>
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
