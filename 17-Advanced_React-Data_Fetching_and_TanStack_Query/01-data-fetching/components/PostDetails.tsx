'use client';

import { use } from 'react';

import type { Post } from '../lib/posts';

const PostDetails = ({ promise }: { promise: Promise<Post> }) => {
  const post = use(promise);

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </article>
  );
};

export default PostDetails;
