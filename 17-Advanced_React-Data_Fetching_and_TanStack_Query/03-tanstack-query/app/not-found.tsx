import Link from 'next/link';

const CatchAll = () => {
  return (
    <>
      <p>Are you lost?</p>
      <p>The page you're looking for doesn't exist</p>
      <Link className='link' href='/'>
        Back to homepage
      </Link>
    </>
  );
};

export default CatchAll;
