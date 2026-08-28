import { useEffect, useState } from 'react';
import { z } from 'zod';

const useFetch = <T extends z.ZodType>(url: string, schema: T) => {
  const [data, setData] = useState<z.infer<typeof schema>>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        }

        const {
          data: parsedData,
          error: parsedError,
          success,
        } = schema.safeParse(await res.json());

        if (!success) {
          throw new Error(z.prettifyError(parsedError));
        }

        setData(parsedData);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchData();

    return () => {
      controller.abort();
    };
  }, [url, schema]);

  return { data, error, loading };
};

export default useFetch;
