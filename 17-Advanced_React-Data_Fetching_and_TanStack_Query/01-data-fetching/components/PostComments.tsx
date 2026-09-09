'use client';

import { use } from 'react';

import type { Comment } from '../lib/posts';

const PostComments = ({ promise }: { promise: Promise<Comment[]> }) => {
  const comments = use(promise);

  if (comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <h3>{comment.name}</h3>
          <p>{comment.body}</p>
          <p>By {comment.email}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostComments;
