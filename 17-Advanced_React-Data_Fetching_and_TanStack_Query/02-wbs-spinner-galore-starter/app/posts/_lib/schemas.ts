import { z } from 'zod';

// Zod prüft die API-Antwort. Wir beschreiben nur die Felder, die wir anzeigen.
const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

const PostsSchema = z.array(PostSchema);

// TypeScript übernimmt den Typ aus dem Zod-Schema.
type Post = z.infer<typeof PostSchema>;

export { PostSchema, PostsSchema };
export type { Post };
