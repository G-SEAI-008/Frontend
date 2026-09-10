import { Suspense } from 'react';

import Loading from '@/components/Loading';

import { getPokemonList } from './_lib/api';
import PokemonList from './PokemonList';

const Page = () => {
  const promise = getPokemonList(150);

  return (
    <>
      <h1>150 Pokémon</h1>
      <Suspense fallback={<Loading message='Catching all the pokémon...' />}>
        <PokemonList promise={promise} />
      </Suspense>
    </>
  );
};

export default Page;
