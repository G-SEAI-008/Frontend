'use client';

import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

import type { Pokemon } from '../_lib/schemas';

type PokemonDetailProps = {
  promise: Promise<Pokemon>;
};

const PokemonDetail = ({ promise }: PokemonDetailProps) => {
  const pokemon = use(promise);
  const image = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <article className='detail'>
      <Link href='/pokemon'>Zurück zu den Pokémon</Link>
      <h1 className='pokemon-name'>{pokemon.name}</h1>
      <p>Pokémon Nr. {pokemon.id}</p>
      {image ? (
        <Image src={image} alt={pokemon.name} width={300} height={300} />
      ) : (
        <p>Für dieses Pokémon gibt es kein Bild.</p>
      )}
    </article>
  );
};

export default PokemonDetail;
