import { useEffect, useState } from 'react';

const PokemonViewer = ({ id }) => {
  // TODO: Create state for loading, error, and data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // TODO: If prop id is not a number between 1 and 151, render "Invalid Pokémon ID" and DO NOT fetch data
  // TODO: useEffect to fetch Pokémon data from https://pokeapi.co/api/v2/pokemon/{id}
  useEffect(() => {
    if (id < 1 || id > 151) {
      return;
    }
    const getPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) {
          throw new Error('failed to fetch pokémon');
        }

        const poke = await res.json();
        setData(poke);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getPokemon();
  }, [id]);
  if (id < 1 || id > 151) {
    return <div>Invalid Pokémon ID</div>;
  }
  // TODO: Show loading indicator initially and while fetching
  if (loading) {
    return <div>Loading...</div>;
  }
  // TODO: Show error message if fetch failed
  if (error) {
    return <div>Failed to fetch pokémon</div>;
  }
  // TODO: Show Pokémon name and image sprites.front_default when data is fetched successfully
  return (
    <div>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>{data.name}</p>
    </div>
  );
};

export default PokemonViewer;
