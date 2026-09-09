import Link from 'next/link';
import { Suspense } from 'react';

import PostComments from '../../../components/PostComments';
import PostDetails from '../../../components/PostDetails';
import { fetchComments, fetchPost } from '../../../lib/posts';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Both URLs use the known ID. Start both requests before reading either result.
  const postPromise = fetchPost(id);
  const commentsPromise = fetchComments(id);

  //   Wenn man auf die Ergebnisse warten möchte, aber beide req parallel laufen sollen
  //   const [post, comments] = await Promise.all([fetchPost(id), fetchComments(id)]);

  return (
    <main>
      <Link href='/'>Home</Link>
      <h1>Post {id} + Comments</h1>

      <Suspense fallback={<p>Loading post...</p>}>
        <PostDetails promise={postPromise} />
      </Suspense>

      <section>
        <h2>Comments</h2>
        <Suspense fallback={<p>Loading comments...</p>}>
          <PostComments promise={commentsPromise} />
        </Suspense>
      </section>
    </main>
  );
};

export default Page;
