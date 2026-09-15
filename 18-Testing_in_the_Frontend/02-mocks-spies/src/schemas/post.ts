import { z } from 'zod';

const PostSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  body: z.string(),
});

export { PostSchema };
