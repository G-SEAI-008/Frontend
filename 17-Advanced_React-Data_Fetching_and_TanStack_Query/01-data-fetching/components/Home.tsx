import Link from 'next/link';

import Products from './Products';

const Home = () => {
  return (
    <div>
      <Products />

      <h2>useEffect – Fetch on Render</h2>
      <Link href='/product/1'>Product 1 (useEffect)</Link>

      <h2>Suspense und use</h2>
      <Link href='/product-v2/1'>Product 1 (Suspense)</Link>

      <h2>Posts-Demo</h2>
      <Link href='/posts'>Posts (Suspense)</Link>

      <h2>Parallele Requests</h2>
      <Link prefetch={false} href='/posts/1'>
        Post 1 + Comments (parallel)
      </Link>
    </div>
  );
};

export default Home;
