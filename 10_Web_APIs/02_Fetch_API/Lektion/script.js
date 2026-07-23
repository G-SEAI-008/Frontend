/**
 * BEISPIELE FÜR DIE FETCH API
 *
 * Die Fetch API ist ein moderner Weg, um Netzwerkanfragen in JavaScript zu stellen.
 * Sie ermöglicht es dir, Daten von Servern (wie RESTful APIs) abzurufen oder Daten dorthin zu senden.
 * Stell sie dir wie einen Boten vor, der zu einer Webseite geht, Informationen holt
 * und sie zurück in deinen Code bringt - und das alles, ohne die Seite neu laden zu müssen!
 */

// BEISPIEL 1: Die ".then" Promise-Chain-Methode
// Das ist der klassische Weg, um mit Promises (Versprechen) in einer Kette von .then() umzugehen.

const fetchFunction = () => {
  fetch("https://jsonplaceholder.typicode.com/posts/1") // Gibt ein Promise zurück, das zu einem Response-Objekt aufgelöst wird
    .then((response) => {
      // Das erste .then() verarbeitet das Response-Objekt (die Server-Antwort)
      if (!response.ok) {
        // Prüfe IMMER, ob die Antwort "ok" ist (Statuscode 200-299)
        throw new Error(`Etwas ist schiefgelaufen. Status: ${response.status}`);
      } else {
        return response.json(); // Wandelt die JSON-Antwort um - dies gibt ein weiteres Promise zurück!
      }
    })
    .then((data) => console.log(data)) // Das zweite .then() verarbeitet die fertigen JSON-Daten
    .catch((error) => console.error(error)); // Fängt jegliche Fehler in der gesamten Promise-Kette ab
};

fetchFunction();

// BEISPIEL 2: Async/Await Methode
// Dies ist eine modernere und sauberere Syntax, um mit Promises umzugehen.
// Sie lässt asynchronen Code so aussehen, als wäre er synchron (als würde er Zeile für Zeile durchlaufen).

const fetchFunctionAsyncAwait = async () => {
  // try/catch wird bei async/await für die Fehlerbehandlung genutzt
  try {
    // "await" pausiert die Ausführung, bis das Promise abgeschlossen ist
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
    );

    if (!response.ok) {
      throw new Error(`Etwas ist schiefgelaufen. Status: ${response.status}`);
    }

    // Ein weiteres "await", um auf das Entpacken der JSON-Antwort zu warten
    const data = await response.json();
    console.log(data);

    // WICHTIG: async/await ist nur "Syntactic Sugar" (eine Vereinfachung) über Promises.
    // Unter der Haube nutzt es immer noch Promises!
  } catch (error) {
    console.error(error);
  }
};

// BEISPIEL 3: Praktische Anwendung - Abgerufene Daten mit DOM-Manipulation nutzen
// Diesmal mit der traditionellen ES5-Funktionsschreibweise statt einer Arrow-Function
async function fetchAndDisplayPost() {
  try {
    // Einen einzelnen Beitrag (mit der ID 1) von der API abrufen
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
    );

    if (!response.ok) {
      throw new Error(`Etwas ist schiefgelaufen. Status: ${response.status}`);
    }

    // Die JSON-Antwort entpacken
    const data = await response.json();

    // Ein DOM-Element (<div>) erstellen, um die abgerufenen Daten anzuzeigen
    const postDiv = document.createElement("div");

    // Das Element rudimentär stylen
    postDiv.style.padding = "10px";
    postDiv.style.border = "1px solid #ccc";

    // Das Element mit Daten füllen, indem wir Template Literals (Backticks) nutzen
    // SICHERHEITSHINWEIS: innerHTML ist potenziell gefährlich (XSS-Risiko)
    postDiv.innerHTML = `
        <h2>${data.title}</h2>
        <p>${data.body}</p>
      `;

    // Das Element der Seite (dem <body>) hinzufügen
    document.body.appendChild(postDiv);
  } catch (error) {
    console.error(error);
  }
}

fetchAndDisplayPost();

// BEISPIEL 4: POST-Request - Daten senden / Eine neue Ressource erstellen

// const createPostAsync = async () => {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
//       method: "POST",
//       body: JSON.stringify({
//         title: "Neuer Post Titel",
//         body: "Dies ist der Inhalt des neuen Posts.",
//         userId: 1,
//       }),
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Etwas ist schiefgelaufen. Status: ${response.status}`);
//     }

//     const newData = await response.json();
//     console.log("Erstellte Post-Daten:", newData);
//   } catch (error) {
//     console.error(error);
//   }
// };

// createPostAsync();

// BEISPIEL 5: PUT-Request - Eine Ziel-Ressource komplett ersetzen

// PUT-Request
// const updatePostAsync = async () => {
//   try {
//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/posts/1",
//       {
//         method: "PUT",
//         body: JSON.stringify({
//           id: 1,
//           title: "Geänderter Post",
//           body: "adaesdag",
//           userId: 1,
//         }),
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Etwas ist schiefgelaufen. Status: ${response.status}`);
//     }

//     const updatedData = await response.json();
//     console.log("Aktualisierte Daten:", updatedData);
//   } catch (error) {
//     console.error(error);
//   }
// };

// updatePostAsync();

// BEISPIEL 6: DELETE-Request - Eine Ziel-Ressource löschen

// DELETE-Request
// const deletePostAsync = async () => {
//   try {
//     const response = await fetch(
//       "https://jsonplaceholder.typicode.com/posts/1",
//       {
//         method: "DELETE",
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Etwas ist schiefgelaufen. Status: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log("Ergebnis:", result);
//   } catch (error) {
//     console.error(error);
//   }
// };

// deletePostAsync();
