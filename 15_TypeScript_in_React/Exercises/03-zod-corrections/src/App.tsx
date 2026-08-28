// oxlint-disable no-shadow

import './App.css';
import ProductList from './components/ProductList';
import useFetch from './hooks/useFetch';
import { CatFactsSchema } from './schemas/catFacts';

function App() {
  const { data, error, loading } = useFetch('https://catfact.ninja/fact', CatFactsSchema);

  return (
    <>
      <h1>Zod Runtime Validation</h1>

      {loading && <p>Loading...</p>}
      <p>{data?.fact}</p>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <ProductList />
    </>
  );
}

export default App;
