import Link from 'next/link';

import type { Post } from './_lib/schemas';

const PostPreview = ({ post }: { post: Post }) => {
  return (
    <li className='card'>
      <Link href={`/posts/${post.id}`}>
        <span>Post {post.id}</span>
        <h2>{post.title}</h2>
      </Link>
    </li>
  );
};

export default PostPreview;
