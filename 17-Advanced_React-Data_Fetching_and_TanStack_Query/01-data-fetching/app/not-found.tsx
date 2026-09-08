import Link from 'next/link';

const NotFound = () => {
  return (
    <main>
      <h1>Not found</h1>
      <p>Diese Seite oder dieser Eintrag existiert nicht.</p>
      <Link href='/'>Home</Link>
    </main>
  );
};

export default NotFound;
