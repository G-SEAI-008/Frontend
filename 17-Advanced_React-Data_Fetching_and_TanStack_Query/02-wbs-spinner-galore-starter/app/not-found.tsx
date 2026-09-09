import Link from 'next/link';

export default function NotFound() {
  return (
    <section>
      <h1>Nicht gefunden</h1>
      <p>Diese Seite oder diesen Eintrag gibt es nicht.</p>
      <Link href='/'>Zur Startseite</Link>
    </section>
  );
}
