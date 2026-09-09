import Link from 'next/link';

export default function HomePage() {
  return (
    <section>
      <p>Next.js · Starter</p>
      <h1>WBS Spinner Galore</h1>
      <p>Lade Daten auf dem Server und zeige während der Wartezeit einen Spinner.</p>
      <ol>
        <li>
          Schreibe vier Fetch-Funktionen in <code>lib/api.ts</code>.
        </li>
        <li>Starte in den Pokémon-Pages den Aufruf und übergib die Promise an eine Komponente.</li>
        <li>
          Lies die Pokémon-Promise in der Komponente mit <code>use</code>.
        </li>
        <li>
          Zeige bei den Pokémon mit <code>Suspense</code> und <code>Loading</code> einen Spinner.
        </li>
        <li>
          Warte bei den Posts direkt in der Server Page mit <code>await</code> auf die Daten.
        </li>
        <li>Prüfe die Detail-Links und den Umgang mit fehlenden Daten.</li>
      </ol>
      <ul>
        <li>
          <Link href='/posts' prefetch={false}>
            100 Posts und ihre Details
          </Link>
        </li>
        <li>
          <Link href='/pokemon' prefetch={false}>
            150 Pokémon und ihre Details
          </Link>
        </li>
      </ul>
    </section>
  );
}
