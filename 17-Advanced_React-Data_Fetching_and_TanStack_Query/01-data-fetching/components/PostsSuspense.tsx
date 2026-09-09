'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { use } from 'react';

import type { Post } from '../lib/posts';

const PostsSuspense = ({ promise }: { promise: Promise<Post[]> }) => {
  const posts = use(promise);

  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>
          <Link href={`/posts/${p.id}` as Route}>{p.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PostsSuspense;
