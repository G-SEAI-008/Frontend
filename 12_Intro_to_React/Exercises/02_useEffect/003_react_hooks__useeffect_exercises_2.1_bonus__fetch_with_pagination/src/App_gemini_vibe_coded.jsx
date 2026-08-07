// oxlint-disable arrow-body-style
import { useEffect, useState } from 'react';

// type Status = "idle" | "loading" | "success" | "error"

const App = () => {
  const [people, setPeople] = useState(null);
  const [url, setUrl] = useState('https://swapi.tech/api/people');
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [status, setStatus] = useState('loading'); // "loading" | "success" | "error"
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

        if (!ignore) {
          setPeople(data.results);
          setNextUrl(data.next);
          setPrevUrl(data.previous);
          setStatus('success');
        }
      } catch (err) {
        if (!ignore) {
          setErrorMessage(err.message || 'Fetch failed');
          setStatus('error');
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]); // Effect läuft nur wenn sich `url` ändert

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
        {/* ? = optional chaining: bei null oder undefined, Folgendes nicht weiter ausführen */}
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
