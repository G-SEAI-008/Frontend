'use client';

import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

import type { Pokemon } from './_lib/schemas';

// Den passenden Typ findest du in ./_lib/schemas.ts.
const PokemonList = ({ promise }: { promise: Promise<Pokemon[]> }) => {
  const pokemon = use(promise);

  return (
    <ul className='grid'>
      {pokemon.map((entry) => (
        <li className='card' key={entry.id}>
          <Link href={`/pokemon/${entry.id}`}>
            <p className='pokemon-name'>{entry.name}</p>
            {entry.sprites.front_default ? (
              <Image src={entry.sprites.front_default} alt={entry.name} width={96} height={96} />
            ) : (
              <p>Kein Pokémon zu finden.</p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;
