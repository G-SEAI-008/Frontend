import { Suspense } from 'react';

import Loading from '@/components/Loading';

import { getPokemon } from '../_lib/api';
import PokemonDetail from './PokemonDetail';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const promise = getPokemon(id);

  return (
    <Suspense fallback={<Loading message='Ash is currently catching the pokémon...' />}>
      <PokemonDetail promise={promise} />
    </Suspense>
  );
};

export default Page;
