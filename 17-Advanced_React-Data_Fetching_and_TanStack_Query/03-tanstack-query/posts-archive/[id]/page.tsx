'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PostSchema } from '../postSchema';
import type { Post } from '../postSchema';

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setLoading(true);
      setError(null);
      setPost(null);

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP: ${response.status}`);
        }

        const data: unknown = await response.json();
        setPost(PostSchema.parse(data));
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
  }, [postId]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p className='text-red-600'>Error: {error}</p>;
  }
  if (post === null) {
    return null;
  }

  return (
    <>
      <p>
        <Link className='link' href='/posts'>
          Back
        </Link>
      </p>
      <h2 className='text-2xl font-bold'>{post.title}</h2>
      <p>{post.body}</p>
    </>
  );
};

export default PostDetails;
