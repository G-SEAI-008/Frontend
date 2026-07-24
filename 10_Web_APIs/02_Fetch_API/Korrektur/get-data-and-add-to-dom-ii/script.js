const pokemonContainer = document.getElementById("pokemon-container");

const fetchPokemon = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok) {
      throw new Error(`Fehler bei Pokémon ${id}. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const createPokemonCard = (pokemon) => {
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add(
    "bg-white",
    "rounded-lg",
    "shadow-md",
    "p-4",
    "flex",
    "flex-col",
    "items-center",
    "text-center",
  );

  const pokemonImage = document.createElement("img");
  pokemonImage.src = pokemon.sprites.front_default;
  pokemonImage.alt = pokemon.name;
  pokemonImage.classList.add("mb-4");

  const pokemonName = document.createElement("h2");
  pokemonName.textContent =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  pokemonName.classList.add("text-xl", "font-bold", "mb-2");

  const pokemonInfo = document.createElement("p");
  pokemonInfo.textContent = `ID: ${pokemon.id} | Typ: ${pokemon.types.map((t) => t.type.name).join(", ")}`;
  pokemonInfo.classList.add("text-gray-600");

  pokemonCard.append(pokemonImage, pokemonName, pokemonInfo);
  return pokemonCard;
};

const displayPokemonsParallel = async () => {
  const pokemonPromises = [];
  for (let i = 1; i <= 100; i++) {
    pokemonPromises.push(fetchPokemon(i));
  }

  const pokemons = await Promise.all(pokemonPromises);

  pokemons.forEach((pokemon) => {
    if (pokemon !== null) {
      const card = createPokemonCard(pokemon);
      pokemonContainer.appendChild(card);
    }
  });
};

displayPokemonsParallel();

// ====================================================
// Erster ANSATZ mit Fehlerbehandlung
// ====================================================

// const pokemonContainer = document.getElementById("pokemon-container");

// // Funktion, um Daten für ein spezifisches Pokémon anhand der ID abzurufen
// const fetchPokemon = async (id) => {
//   try {
//     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//     if (!response.ok) {
//       throw new Error(`Etwas ist schiefgelaufen. Status: ${response.status}`);
//     }
//     const pokemon = await response.json();
//     // console.log(pokemon);
//     return pokemon;
//   } catch (error) {
//     console.error(error);
//     // null zurückgeben, anstatt den Fehler erneut zu werfen
//     return null;
//   }
// };

// // Funktion, um Pokémon-Karten im DOM anzuzeigen
// const displayPokemons = async () => {
//   // Durch die ersten 20 Pokémon-IDs iterieren
//   for (let i = 1; i <= 151; i++) {
//     const pokemon = await fetchPokemon(i);

//     // Wenn fetchPokemon null zurückgibt, bedeutet das, dass ein Fehler aufgetreten ist
//     if (pokemon === null) {
//       // Die Schleife bei jedem Fehler stoppen
//       console.error(`Schleife wegen eines Fetch-Fehlers gestoppt!`);
//       break;
//     }

//     // Die Pokémon-Karte erstellen und anzeigen
//     const pokemonCard = document.createElement("div");
//     pokemonCard.classList.add(
//       "bg-white",
//       "rounded-lg",
//       "shadow-md",
//       "p-4",
//       "flex",
//       "flex-col",
//       "items-center",
//       "text-center",
//     );

//     const pokemonImage = document.createElement("img");
//     pokemonImage.src = pokemon.sprites.front_default;
//     pokemonImage.alt = pokemon.name;
//     pokemonImage.classList.add("mb-4");

//     const pokemonName = document.createElement("h2");
//     pokemonName.textContent =
//       pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
//     pokemonName.classList.add("text-xl", "font-bold", "mb-2");

//     const pokemonInfo = document.createElement("p");
//     pokemonInfo.textContent = `ID: ${pokemon.id} | Typ: ${pokemon.types
//       .map((typeInfo) => typeInfo.type.name)
//       .join(", ")}`;
//     pokemonInfo.classList.add("text-gray-600");

//     pokemonCard.appendChild(pokemonImage);
//     pokemonCard.appendChild(pokemonName);
//     pokemonCard.appendChild(pokemonInfo);

//     pokemonContainer.appendChild(pokemonCard);
//   }
// };

// // Pokémon beim Laden der Seite abrufen und anzeigen
// displayPokemons();
