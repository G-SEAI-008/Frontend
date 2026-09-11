'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { postQueryOptions } from '../queries';

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const { data: post, isError, error, isPaused, isFetching } = useQuery(postQueryOptions(postId));

  if (post === undefined) {
    if (isError) {
      return <p className='text-red-600'>Error: {error.message}</p>;
    }
    return <p>{isPaused ? 'Request paused...' : 'Loading...'}</p>;
  }

  return (
    <>
      <p>
        <Link className='link' href='/posts'>
          Back
        </Link>
      </p>
      <h2 className='text-2xl font-bold'>
        {post.title} {isFetching ? '(refreshing)' : ''}
      </h2>

      {isError && (
        <p className='text-red-600'>Refresh failed: {error.message}. Showing cached data.</p>
      )}

      {isPaused && <p>Request paused. Showing cached data.</p>}

      <p>{post.body}</p>
    </>
  );
};

export default PostDetails;
