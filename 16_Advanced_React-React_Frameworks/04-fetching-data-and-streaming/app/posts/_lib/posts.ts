import { z } from 'zod';

const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

const PostsSchema = z.array(PostSchema);

const getPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data: unknown = await res.json();
  //   console.log(data);
  return PostsSchema.parse(data);
};

export { PostSchema, getPosts };
