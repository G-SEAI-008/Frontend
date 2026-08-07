# Fetching ohne `useEffect` & Optimierung von Re-Renders

In modernen React-Anwendungen wird das Auslösen von Fetches über `useEffect` bei Benutzeraktionen häufig vermieden. Hier erfährst du, wie man Re-Renders auf das Minimum reduziert und welche stabilen Alternativen es gibt.

---

## 1. Die Render-Mathematik: Wie viele Re-Renders sind minimal möglich?

Wenn der Nutzer auf **"Next"** oder **"Previous"** klickt und eine Ladeanzeige ("Loading...") angezeigt werden soll, sind **exakt 2 Re-Renders das physikalische Minimum**:

$$\text{Re-Renders pro Klick} = 1\text{ (Ladezustand anzeigen)} + 1\text{ (Daten anzeigen)} = 2\text{ Renders}$$

1. **Render 1 (Sofort bei Klick):** Die Benutzeroberfläche schaltet auf `"loading"` um.
2. **Render 2 (Nach der API-Antwort):** Die Benutzeroberfläche schaltet auf `"success"` um und zeigt die neuen Daten an.

> **Wichtig – React 18+ Automatic Batching:**  
> Seit React 18 fasst React alle `setState`-Aufrufe innerhalb desselben Event-Handlers oder nach einem `await` automatisch zu **einem einzigen Re-Render** zusammen.  
> Wenn du nach dem `fetch` vier States gleichzeitig setzt (`setPeople`, `setNextUrl`, `setPrevUrl`, `setStatus`), erzeugt das **zusammen NUR 1 Re-Render**!

---

## 2. Möglichkeit 1: Event-Driven Fetching (Direkt im `onClick`-Handler)

Statt `useEffect` auf State-Änderungen (`url`) lauschen zu lassen, wird der Fetch für die Pagination **direkt von der Benutzeraktion** (dem Klick-Event) ausgelöst. Der `useEffect` wird **nur ein einziges Mal beim initialen Laden** der Komponente aufgerufen.

### Code-Beispiel (`Event-Driven`):

```jsx
import { useEffect, useState } from 'react';

const App = () => {
  const [people, setPeople] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [status, setStatus] = useState('loading');

  // Zentralisierte Fetch-Funktion (außerhalb von useEffect)
  const fetchPage = async (targetUrl) => {
    setStatus('loading'); // Render 1: Zeige sofort "Loading..."

    try {
      const res = await fetch(targetUrl);
      if (!res.ok) throw new Error('Fetch failed');

      const data = await res.json();

      // Automatic Batching: Diese 4 State-Updates erzeugen zusammen NUR Render 2!
      setPeople(data.results);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  // 1. Initialer Load beim Start der Komponente (nur 1x beim Mount)
  useEffect(() => {
    fetchPage('https://swapi.tech/api/people');
  }, []);

  // 2. Pagination direkt über Event-Handler (OHNE useEffect)
  const handlePrev = () => {
    if (prevUrl) fetchPage(prevUrl);
  };

  const handleNext = () => {
    if (nextUrl) fetchPage(nextUrl);
  };

  return (
    <main className='p-8'>
      <div className='flex gap-4 mb-4'>
        <button
          onClick={handlePrev}
          disabled={!prevUrl || status === 'loading'}
          className='px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50'
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!nextUrl || status === 'loading'}
          className='px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p className='text-red-500'>Fehler beim Laden.</p>}
      {status === 'success' && (
        <ul>
          {people?.map((person) => (
            <li key={person.uid}>{person.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default App;
```

### Warum ist Event-Driven Fetching oft besser?

1. **Kein Verstecken von Logik im `useEffect`:** Die Reaktion auf den Klick passiert direkt dort, wo geklickt wurde (`onClick`).
2. **Minimalste Renders:** Exakt 2 Re-Renders pro Seitenwechsel (1x für Loading, 1x für Daten).
3. **Keine Dependency-Probleme:** Kein `useCallback`, kein `[url]`-Dependency-Array im Effect, das versehentlich Endlosschleifen erzeugen könnte.

---

## 3. Möglichkeit 2: TanStack Query / React Query (Der Industrie-Standard)

In produktiven React-Anwendungen schreibt man Daten-Fetching, Caching und Loading-States selten manuell mit `useState` + `useEffect`. Man nutzt Bibliotheken wie **TanStack Query (React Query)**.

### Code-Beispiel (`TanStack Query`):

```jsx
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const fetchPeople = (url) => fetch(url).then((res) => res.json());

const App = () => {
  const [url, setUrl] = useState('https://swapi.tech/api/people');

  // TanStack Query übernimmt Caching, Loading, Error & Minimal-Renders
  const { data, isPending, isError } = useQuery({
    queryKey: ['people', url],
    queryFn: () => fetchPeople(url),
  });

  return (
    <div>
      <button onClick={() => setUrl(data.previous)} disabled={!data?.previous}>
        Previous
      </button>
      <button onClick={() => setUrl(data.next)} disabled={!data?.next}>
        Next
      </button>

      {isPending && <p>Loading...</p>}
      {isError && <p>Fehler beim Laden.</p>}
      {data && (
        <ul>
          {data.results.map((person) => (
            <li key={person.uid}>{person.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

### Vorteile von TanStack Query:

- **0 manueller Fetch-Code im `useEffect`**
- **Automatisches Caching:** Klickt der Nutzer zurück auf "Previous", werden die Daten sofort aus dem RAM-Speicher geladen — **0 Ladezeit, nur 1 Re-Render (Daten sind sofort da)**.
- Automatische Handhabung von Abbrüchen, Retries und Fehlerzuständen.

---

## 4. Vergleichstabelle

| Methode                      | Re-Renders pro Klick        | Komplexität                          | Wann nutzen?                                                      |
| :--------------------------- | :-------------------------- | :----------------------------------- | :---------------------------------------------------------------- |
| **`useEffect` auf `[url]`**  | 2 Renders                   | Mittel (Achtung vor ESLint Warnings) | Gut für URL-basierte Routen (z. B. Query-Params `/people?page=2`) |
| **Event-driven (`onClick`)** | **2 Renders**               | **Sehr gering & stabil**             | **Ideal für Übungen & einfaches Client-Fetching**                 |
| **TanStack Query**           | **1–2 Renders** (Cached: 1) | Gering im Komponentencode            | **Standard für produktive Anwendungen**                           |

---

## Fazit & Empfehlung

Für React-Übungen ohne externe Pakete ist **Event-Driven Fetching im `onClick`-Handler** die sauberste, durchsichtigste und render-effizienteste Lösung.
