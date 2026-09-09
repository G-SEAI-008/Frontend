import PokemonDetail from './PokemonDetail';

// TODO 2: Starte den API-Aufruf und übergib die Promise an PokemonDetail.
// TODO 4: Umschließe die Komponente mit Suspense und einem Loading-Fallback.
// Die URL-Parameter bekommst du als params: Promise<{ id: string }>.
// Mache die Page async und lies die ID mit: const { id } = await params;
const Page = () => {
  return (
    <>
      <h1>Ein Pokémon</h1>
      <PokemonDetail />
    </>
  );
};

export default Page;
