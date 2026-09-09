import PokemonList from '../../components/PokemonList';

// TODO 2: Starte den API-Aufruf und übergib die Promise an PokemonList.
// TODO 4: Umschließe die Komponente mit Suspense und einem Loading-Fallback.
export default function Page() {
  return (
    <>
      <h1>150 Pokémon</h1>
      <PokemonList />
    </>
  );
}
