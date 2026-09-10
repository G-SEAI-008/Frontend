import Link from 'next/link';

import { getPost } from '../_lib/api';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <article className='detail'>
      <Link href='/posts'>Zurück zu den Posts</Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
};

export default Page;
