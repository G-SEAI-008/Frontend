import { useState } from 'react';
import { useEffect } from 'react';

const FetchInEffect = () => {
  // # Zustände des API-Aufrufs
  // * Eigene Zustände bilden Daten, Ladephase und Fehler des asynchronen Ablaufs getrennt ab.
  const [todos, setTodos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // # API-Aufruf beim Mounting
  // * useEffect selbst bleibt synchron, damit React seine optionale Cleanup-Funktion erhalten kann.
  useEffect(() => {
    // * Das Signal verbindet den Request mit dem AbortController des aktuellen Effects.
    const controller = new AbortController(); // um den Fetch call abzubrechen

    // * Die innere async-Funktion ermöglicht await, ohne den Effect-Callback asynchron zu machen.
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error('Abruf fehlgeschlagen');
        }

        const data = await res.json();
        setTodos(data);
      } catch (err) {
        // React StrictMode (dev) kann einen zusätzlichen mount/cleanup cycle auslösen.
        // Ignoriere abort-bezogene errors, damit nur echte Fehler die UI erreichen.
        // ! StrictMode kann in der Entwicklung einen zusätzlichen Mounting- und Cleanup-Zyklus auslösen.
        // * Abbrüche gehören zum Effect-Lifecycle; nur echte Request-Fehler gelangen in den Fehlerzustand.
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    // Cleanup function, die Fetch abbricht
    // # Laufenden Request beim Unmounting abbrechen
    // * Der Cleanup verhindert, dass ein nicht mehr benötigter Request weiterläuft.
    return () => controller.abort();
  }, []);

  return (
    <div>
      {loading && <p>Lädt...</p>}
      {error && <p>Fehler: {error}</p>}
      {todos &&
        todos.map((item) => (
          <article key={item.id}>
            <h2>
              {item.title} <span>{item.completed ? '✅' : '❌'}</span>
            </h2>
          </article>
        ))}
    </div>
  );
};
export default FetchInEffect;
