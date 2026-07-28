// oxlint-disable arrow-body-style promise/prefer-await-to-then promise/prefer-await-to-callbacks promise/always-return

let counter = 1;

const intervalId = setInterval(() => {
  fetchPokemon();

  counter++;

  if (counter > 5) {
    clearInterval(intervalId);
  }
}, 1000);

function fetchPokemon() {
  const url = `https://pokeapi.co/api/v2/pokemon/${counter}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Abruf von Pokemon ${counter} fehlgeschlagen: ${response.status} ${response.statusText}`,
        );
      }
      return response.json();
    })
    .then((data) => {
      const pokemon = {
        id: data.id,
        name: data.name,
      };

      console.log(pokemon);
    })
    .catch((error) => {
      console.error('Fehler beim Abrufen der Pokemon-Daten', error);
    });
}
