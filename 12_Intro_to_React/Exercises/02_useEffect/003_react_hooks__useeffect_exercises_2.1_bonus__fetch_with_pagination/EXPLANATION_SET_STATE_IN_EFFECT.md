# Erklärung: React ESLint-Fehler `react-hooks/set-state-in-effect`

## 1. Die Fehlermeldung

```text
Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. (https://react.dev/learn/you-might-not-need-an-effect).
```

---

## 2. Was bedeutet dieser Fehler?

### A. Kaskadierendes Rendern (_Cascading Renders_)

Wenn React eine Komponente rendert, führt es nach dem Aktualisieren des DOMs den `useEffect` aus.  
Wenn **innerhalb des Effects** (oder einer dort aufgerufenen Funktion) **synchron** `setState` aufgerufen wird:

1. bricht React die Arbeit am aktuellen Render-Ergebnis ab bzw. entwirft es sofort neu,
2. wird umgehend ein **zweiter Render-Durchlauf** angestoßen.

Dies nennt man _Cascading Render_. Es führt zu unnötigem Performance-Overhead, Re-Renders und kann in Schleifen enden.

### B. Zweck von `useEffect`

Ein `useEffect` dient dazu, den React-State mit externen Systemen (wie einer HTTP-API, dem DOM oder Event-Subscriptions) zu **synchronisieren**. State-Updates innerhalb eines Effects sollten in der Regel **erst asynchron** in Response-Callbacks (z. B. nach `await fetch(...)`) ausgeführt werden, nicht direkt synchron beim Start des Effekts.

---

## 3. Warum trat das im ursprünglichen Code auf?

In `App.jsx` sah die Struktur vorher wie folgt aus:

```jsx
const fetchData = useCallback(async (url) => {
  setStatus('loading'); // ❌ Synchroner Aufruf von setState VOR dem await fetch!
  const res = await fetch(url);
  // ...
}, []);

useEffect(() => {
  fetchData('https://swapi.tech/api/people'); // ❌ Triggert setStatus('loading') synchron im Effect
}, [fetchData]);
```

### Die zwei Hauptprobleme:

1. **Synchone Ausführung bis zum ersten `await`:**  
   Auch wenn `fetchData` eine `async`-Funktion ist, wird der Funktionscode **vor** dem ersten `await` (`setStatus('loading')`) **synchron** beim Aufruf innerhalb von `useEffect` ausgeführt.
2. **Fehlende Reaktivität des `url`-States:**  
   `url` war zwar im `useState` angelegt, wurde aber nicht im `useEffect` abgefragt. Stattdessen haben die Pagination-Buttons `Next` und `Previous` direkt `fetchData(nextUrl)` aufgerufen, statt den State `url` zu verändern.

---

## 4. Die saubere Lösung nach React Best Practices

In idiomatischem React steuert der **State** den Effekt.

1. **`url` als reaktiver State:**  
   Wenn der Benutzer auf "Next" oder "Previous" klickt, aktualisiert die Klick-Funktion den State `url` (z. B. `setUrl(nextUrl)`).
2. **Kein synchrones `setStatus` im Effect-Body:**  
   Da der initiale State von `status` bereits `'loading'` ist (`useState('loading')`), muss der `useEffect` beim ersten Rendern kein synchrones `setStatus('loading')` aufrufen.
3. **`useEffect` horcht auf `[url]`:**  
   Der Effect wird automatisch getriggert, sobald sich `url` ändert. Er führt das asynchrone `fetch(url)` aus und setzt den State erst **nach** erfolgreicher Antwort des Servers.
4. **Cleanup gegen Race Conditions:**  
   Mit einem `ignore`-Flag wird verhindert, dass veraltete Netzwerkanfragen den State überschreiben, falls der Nutzer schnell zwischen Seiten hin- und her-klickt.

---

## 5. Korrigierter Code (`src/App.jsx`)

```jsx
import { useEffect, useState } from 'react';

const App = () => {
  const [people, setPeople] = useState(null);
  const [url, setUrl] = useState('https://swapi.tech/api/people');
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Fetch failed');
        }

        const data = await res.json();

        // State-Updates erst ASYNCHRON nach dem Fetch
        if (!ignore) {
          setPeople(data.results);
          setNextUrl(data.next);
          setPrevUrl(data.previous);
          setStatus('success');
        }
      } catch (err) {
        if (!ignore) {
          setErrorMessage(err instanceof Error ? err.message : 'Fetch failed');
          setStatus('error');
        }
      }
    };

    fetchData();

    // Cleanup-Funktion zum Verhindern von Race Conditions
    return () => {
      ignore = true;
    };
  }, [url]); // Effect wird ausgeführt, sobald sich `url` ändert

  // Event-Handler verändern den State
  const handlePrev = () => {
    if (prevUrl) {
      setStatus('loading');
      setUrl(prevUrl);
    }
  };

  const handleNext = () => {
    if (nextUrl) {
      setStatus('loading');
      setUrl(nextUrl);
    }
  };

  return (
    <main className='min-h-screen bg-gray-900 p-8 font-sans'>
      <div className='mb-2 flex justify-center gap-8 p-2'>
        {prevUrl && (
          <button
            onClick={handlePrev}
            className='mb-2 cursor-pointer rounded bg-white px-4 py-2 text-gray-900'
          >
            Previous
          </button>
        )}
        {nextUrl && (
          <button
            onClick={handleNext}
            className='mb-2 cursor-pointer rounded bg-white px-4 py-2 text-gray-900'
          >
            Next
          </button>
        )}
      </div>
      <h1 className='mb-2 text-center text-4xl font-bold text-yellow-300'>Star Wars Characters</h1>

      {status === 'loading' && <p className='text-center font-medium text-gray-200'>Loading...</p>}
      {status === 'error' && (
        <p className='text-center font-semibold text-red-500'>{errorMessage}</p>
      )}

      <ul className='grid gap-4 sm:grid-cols-2'>
        {status === 'success' &&
          people?.map((person) => (
            <li key={person.uid} className='rounded bg-white p-4 text-center capitalize shadow'>
              <span className='font-semibold text-gray-800'>{person.name}</span>
            </li>
          ))}
      </ul>
    </main>
  );
};

export default App;
```
