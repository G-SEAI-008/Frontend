'use client';

export default function ErrorPage() {
  return (
    <section role='alert'>
      <h1>Die Daten konnten nicht geladen werden.</h1>
      <p>Bitte überprüfe deine Internetverbindung und versuche es noch einmal.</p>
      <button
        onClick={() => {
          globalThis.location.reload();
        }}
      >
        Erneut versuchen
      </button>
    </section>
  );
}
