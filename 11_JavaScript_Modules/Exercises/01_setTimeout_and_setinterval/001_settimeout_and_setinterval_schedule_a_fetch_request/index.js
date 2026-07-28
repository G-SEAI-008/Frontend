// oxlint-disable arrow-body-style promise/prefer-await-to-then promise/prefer-await-to-callbacks promise/always-return
// # Use `setInterval` to schedule a fetch request to the Pokémon API and increment a counter. For every request, output an object with the name of the Pokémon and its ID.

// * Step 1: Create a variable `counter` and set it to 1.
let counter = 1;

// * Step 2: Use `setInterval` to schedule a fetch request to the Pokémon API every second.
const intervalId = setInterval(() => {
  // * Step 3: The fetch request URL should be `https://pokeapi.co/api/v2/pokemon/` followed by the current value of `counter`.
  const url = `https://pokeapi.co/api/v2/pokemon/${counter}`;

  // * Step 4: Fetch the data and extract the Pokémon's name and ID.
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
      // * Step 5: Output an object with the Pokémon's name and ID to the console.
      const pokemon = {
        id: data.id,
        name: data.name,
      };

      console.log(pokemon);
    })
    .catch((error) => {
      console.error('Fehler beim Abrufen der Pokemon-Daten', error);
    });
  // * Step 6: Increment the counter after each fetch request.
  counter++;
  // * Step 7: Stop the interval after 150 requests. We only want the OG Pokémon! :D
  if (counter > 5) {
    clearInterval(intervalId);
  }
}, 1000);
