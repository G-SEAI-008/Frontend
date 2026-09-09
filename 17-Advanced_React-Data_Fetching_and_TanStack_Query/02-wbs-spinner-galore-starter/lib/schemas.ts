// oxlint-disable unicorn/max-nested-calls
import { z } from 'zod';

// Zod prüft die API-Antwort. Wir beschreiben nur die Felder, die wir anzeigen.
// Passe die Pokémon-Schemas an deine Liste und das gewünschte Detailbild an.
export const PokemonListSchema = z.object({
  results: z.array(z.object({ name: z.string() })),
});

export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  sprites: z.object({ front_default: z.httpUrl().nullable() }),
});

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const PostsSchema = z.array(PostSchema);

// TypeScript übernimmt die Typen aus den Zod-Schemas.
export type PokemonList = z.infer<typeof PokemonListSchema>;
export type Pokemon = z.infer<typeof PokemonSchema>;
export type Post = z.infer<typeof PostSchema>;
