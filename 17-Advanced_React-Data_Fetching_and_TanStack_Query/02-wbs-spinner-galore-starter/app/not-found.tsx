import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section>
      <Image src='/404.gif' alt='404 Not Found' width={256} height={256} loading='eager' />
      <h1>Nicht gefunden</h1>
      <p>Diese Seite oder diesen Eintrag gibt es nicht.</p>
      <Link href='/'>Zur Startseite</Link>
    </section>
  );
}
