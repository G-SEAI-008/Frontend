import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center'>
      <img src='/404.gif' alt='404 Not Found' className='mb-6 h-64 w-64' />
      <h1 className='text-error mb-2 text-4xl font-bold'>Page Not Found</h1>
      <p className='text-base-content mb-6 text-lg'>
        Sorry, the page you are looking for doesn't exist.
      </p>
      <button className='btn btn-primary' onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
};

export default NotFound;
