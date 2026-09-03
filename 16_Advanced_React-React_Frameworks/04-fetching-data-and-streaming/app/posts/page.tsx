import { Suspense } from 'react';

import { getPosts } from '@/app/posts/_lib/posts';

import { PostList, PostListSkeleton } from './_components/PostList';

const Posts = () => {
  const postsPromise = getPosts();
  return (
    <div>
      <h1 className='font-bold'>Latest Posts:</h1>
      <Suspense fallback={<PostListSkeleton />}>
        <PostList postsPromise={postsPromise} />
      </Suspense>
    </div>
  );
};

export default Posts;
