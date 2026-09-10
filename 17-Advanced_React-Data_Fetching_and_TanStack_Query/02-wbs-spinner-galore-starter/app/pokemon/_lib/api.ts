'use server';

import { notFound } from 'next/navigation';

import type { Pokemon } from './schemas';
import { PokemonSchema } from './schemas';

const getPokemon = async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(id)}/`, {
    cache: 'no-store',
  });
  if (response.status === 404) {
    notFound();
  }
  if (!response.ok) {
    throw new Error('Das Pokemon konnte nicht geladen werden.');
  }
  const data: unknown = await response.json();
  return PokemonSchema.parse(data);
};

// oxlint-disable-next-line require-await
const getPokemonList = async (count = 150) => {
  const promises: Promise<Pokemon>[] = [];

  for (let id = 1; id <= count; id++) {
    promises.push(getPokemon(String(id)));
  }

  return Promise.all(promises);
};
// const getPokemonList = async (count = 150) => {
//   return Promise.all(Array.from({ length: count }, (_, index) => getPokemon(String(index + 1))));
// };

export { getPokemon, getPokemonList };
