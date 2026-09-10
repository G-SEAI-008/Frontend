// oxlint-disable unicorn/max-nested-calls
import { z } from 'zod';

// Zod prüft die API-Antwort. Wir beschreiben nur die Felder, die wir anzeigen.
// Passe die Pokémon-Schemas an deine Liste und das gewünschte Detailbild an.
const PokemonListSchema = z.object({
  results: z.array(z.object({ name: z.string() })),
});

const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  sprites: z.object({
    front_default: z.httpUrl().nullable(),
    other: z.object({
      'official-artwork': z.object({
        front_default: z.httpUrl().nullable(),
      }),
    }),
  }),
});

// TypeScript übernimmt die Typen aus den Zod-Schemas.
type PokemonList = z.infer<typeof PokemonListSchema>;
type Pokemon = z.infer<typeof PokemonSchema>;

export { PokemonListSchema, PokemonSchema };
export type { PokemonList, Pokemon };
