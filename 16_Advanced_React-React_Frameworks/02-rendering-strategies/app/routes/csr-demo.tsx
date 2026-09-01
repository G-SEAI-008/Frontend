// oxlint-disable import/exports-last
import z from 'zod';

import type { Route } from './+types/csr-demo';

// type Post = {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// };

const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

const PostsSchema = z.array(PostSchema);

export async function clientLoader() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts = PostsSchema.parse(await res.json());
  return posts;
}

export function HydrateFallback() {
  return <p>Loading...</p>;
}

const CsrDemo = ({ loaderData }: Route.ComponentProps) => {
  return (
    <>
      <h2>CsrDemo</h2>
      <p>This data was fetched in the browser</p>
      <ul>
        {loaderData.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
};

export default CsrDemo;
