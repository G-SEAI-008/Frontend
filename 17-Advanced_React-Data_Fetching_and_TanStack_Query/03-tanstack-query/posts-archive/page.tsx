'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { PostsSchema } from './postSchema';
import type { Post } from './postSchema';

const Posts = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP: ${response.status}`);
        }

        const data: unknown = await response.json();
        const parsedPost = PostsSchema.parse(data);
        setPosts(parsedPost);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p className='text-red-600'>Error: {error}</p>;
  }
  if (posts === null) {
    return null;
  }

  if (posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <>
      <h2 className='text-2xl font-bold'>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link className='link' href={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Posts;
