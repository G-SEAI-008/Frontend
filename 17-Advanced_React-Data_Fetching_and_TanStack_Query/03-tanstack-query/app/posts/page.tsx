'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { fetchJSON } from './api';
import { PostsSchema } from './postSchema';

const Posts = () => {
  const query = useQuery({
    queryKey: ['posts', 'list', { limit: 10 }],
    queryFn: async ({ signal }) => {
      const data = await fetchJSON('https://jsonplaceholder.typicode.com/posts?_limit=10', {
        signal,
      });
      return PostsSchema.parse(data);
    },
  });

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
              <Link className='link' href={`/posts/${post.id}`}>
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
