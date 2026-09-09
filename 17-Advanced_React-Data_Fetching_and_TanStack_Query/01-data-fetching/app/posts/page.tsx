import { Suspense } from 'react';

import PostsSuspense from '../../components/PostsSuspense';
import { fetchPosts } from '../../lib/posts';

const Page = () => {
  const postsPromise = fetchPosts();

  return (
    <Suspense fallback={<p>Loading posts...</p>}>
      <PostsSuspense promise={postsPromise} />
    </Suspense>
  );
};

export default Page;
