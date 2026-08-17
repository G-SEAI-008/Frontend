const titleEl = document.getElementById('post-title');
const bodyEl = document.getElementById('post-body');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-text');
const statusMsg = document.getElementById('status-message');

async function loadPost() {
  try {
    const response = await fetch('https://dummyjson.com/posts/96');
    const post = await response.json();
    // console.log("The Content: ", post);
    titleEl.textContent = post.title;
    bodyEl.textContent = post.body;
  } catch (error) {
    titleEl.textContent = 'Error loading post';
    console.error(error);
  }
}

// Event Listener wartet auf das Absenden des Formulars
commentForm.addEventListener('submit', async (event) => {
  // Verhindert das Standard-Verhalten des Formulars (Seite neu laden)
  event.preventDefault();

  // Wert aus dem Eingabefeld auslesen
  const commentValue = commentInput.value;
  console.log('Das wird gepostet:', commentValue);

  // Daten-Objekt zusammenstellen, das an den Server geschickt wird
  const formData = {
    body: commentValue,
    postId: 96,
    userId: 5,
  };

  try {
    // POST-Anfrage an die API senden
    const response = await fetch('https://dummyjson.com/comments/add', {
      method: 'POST', // HTTP-Methode: Daten senden
      headers: {
        'Content-Type': 'application/json', // Server weiß: es kommt JSON
      },
      body: JSON.stringify(formData), // JS-Objekt → JSON-String umwandeln
    });

    console.log(response); // Rohe HTTP-Antwort (Status, Headers, …)

    // Antwort-Body als JavaScript-Objekt einlesen
    const data = await response.json();

    console.log(data); // Verarbeitete Antwort vom Server -> Anzeige in der UI...
  } catch (error) {
    // Netzwerkfehler oder andere unerwartete Fehler landen hier
  }
});

// Initialize
loadPost();
