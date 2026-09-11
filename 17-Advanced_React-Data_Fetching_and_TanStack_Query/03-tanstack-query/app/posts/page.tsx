'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

import { postQueryOptions, postsQueryOptions } from './queries';

const Posts = () => {
  const queryClient = useQueryClient();

  const query = useQuery(postsQueryOptions());

  const prefetchPost = async (postId: number) => {
    try {
      await queryClient.query(postQueryOptions(postId));
    } catch {
      // Optionales Vorladen fehlgeschlagen.
      // Beim Öffnen der Detailseite behandeln wir den Fehler dort.
    }
  };

  // if (query.isPending) {
  //   return <p>Loading...</p>;
  // }
  // if (query.isError) {
  //   return <p className='text-red-600'>Error: {query.error.message}</p>;
  // }

  if (query.data === undefined) {
    if (query.isError) {
      return <p className='text-red-600'>Error: {query.error.message}</p>;
    }
    return <p>{query.isPaused ? 'Request paused...' : 'Loading...'}</p>;
  }

  const posts = query.data;
  // if (posts.length === 0) {
  //   return <p>No posts found.</p>;
  // }

  return (
    <>
      <h2 className='text-2xl font-bold'>Posts {query.isFetching ? '(refreshing)' : ''}</h2>

      {query.isError && (
        <p className='text-red-600'>Refresh failed: {query.error.message}. Showing cached data.</p>
      )}
      {query.isPaused && <p>Request paused. Showing cached data.</p>}

      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                className='link'
                href={`/posts/${post.id}`}
                // oxlint-disable-next-line typescript/strict-void-return typescript/no-misused-promises
                onMouseEnter={() => prefetchPost(post.id)}
                // oxlint-disable-next-line typescript/strict-void-return typescript/no-misused-promises
                onFocus={() => prefetchPost(post.id)}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Posts;
