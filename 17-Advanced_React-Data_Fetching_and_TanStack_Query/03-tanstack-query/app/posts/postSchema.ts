import { z } from 'zod';

const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

const PostsSchema = z.array(PostSchema);

type Post = z.infer<typeof PostSchema>;

export { PostSchema, PostsSchema };
export type { Post };
