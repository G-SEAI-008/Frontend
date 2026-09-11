const fetchJSON = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`HTTP: ${res.status}`);
  }
  const data: unknown = await res.json();
  return data;
};

export { fetchJSON };
