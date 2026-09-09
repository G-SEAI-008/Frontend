'use client';

const ErrorPage = ({ retry }: { retry: () => void }) => {
  return (
    <section role='alert'>
      <h1>Die Daten konnten nicht geladen werden.</h1>
      <p>Bitte überprüfe deine Internetverbindung und versuche es noch einmal.</p>
      <button onClick={retry}>Erneut versuchen</button>
    </section>
  );
};

export default ErrorPage;
