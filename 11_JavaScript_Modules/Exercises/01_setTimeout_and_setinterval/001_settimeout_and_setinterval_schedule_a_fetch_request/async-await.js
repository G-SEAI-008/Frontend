// oxlint-disable arrow-body-style promise/prefer-await-to-then promise/prefer-await-to-callbacks promise/always-return

let counter = 1;

const intervalId = setInterval(() => {
  fetchPokemon();

  counter++;

  if (counter > 5) {
    clearInterval(intervalId);
  }
}, 1000);

async function fetchPokemon() {
  const url = `https://pokeapi.co/api/v2/pokemon/${counter}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Abruf von Pokemon ${counter} fehlgeschlagen: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();

    const pokemon = {
      id: data.id,
      name: data.name,
    };
    console.log(pokemon);
  } catch (error) {
    console.error('Fehler beim Abrufen der Pokemon-Daten', error);
  }
}
