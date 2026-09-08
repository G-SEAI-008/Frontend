'use client';

const ErrorPage = ({ retry }: { retry: () => void }) => {
  return (
    <div>
      <p>Error: Daten konnten nicht geladen werden.</p>
      <button onClick={retry}>Erneut versuchen</button>
    </div>
  );
};

export default ErrorPage;
