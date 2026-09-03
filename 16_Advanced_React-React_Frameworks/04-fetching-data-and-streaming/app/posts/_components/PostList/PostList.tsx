'use client';

import { use } from 'react';

import type { Post } from '@/app/posts/_lib/posts';

type PostListProps = {
  postsPromise: Promise<Post[]>;
};

const PostList = ({ postsPromise }: PostListProps) => {
  const posts = use(postsPromise);

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
