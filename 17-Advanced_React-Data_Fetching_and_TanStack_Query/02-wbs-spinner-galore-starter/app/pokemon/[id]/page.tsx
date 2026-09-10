import { Suspense } from 'react';

import Loading from '@/components/Loading';

import { getPokemon } from '../_lib/api';
import PokemonDetail from './PokemonDetail';

// TODO 2: Starte den API-Aufruf und übergib die Promise an PokemonDetail.
// TODO 4: Umschließe die Komponente mit Suspense und einem Loading-Fallback.
// Die URL-Parameter bekommst du als params: Promise<{ id: string }>.
// Mache die Page async und lies die ID mit: const { id } = await params;
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const promise = getPokemon(id);

  return (
    <>
      <Suspense fallback={<Loading message='Ash is currently catching the pokémon...' />}>
        <PokemonDetail promise={promise} />
      </Suspense>
    </>
  );
};

export default Page;
