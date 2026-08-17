import { use } from 'react';
import { useActionState } from 'react';

import { searchProducts } from '../api/index.js';
import { Instructions, SearchForm, SearchResults } from '../components';

const productsPromise = searchProducts();

const parseOptionalNumber = (value) => {
  if (value === '') return undefined;
  return Number(value);
};

async function searchAction(previousState, formData) {
  const {
    category,
    query,
    minPrice: rawMinPrice,
    maxPrice: rawMaxPrice,
  } = Object.fromEntries(formData);

  // const parsedMin = parseFloat(formData.get('minPrice'));
  // const minPrice = Number.isNaN(parsedMin) ? undefined : parsedMin;

  // const parsedMax = parseFloat(formData.get('maxPrice'));
  // const maxPrice = Number.isNaN(parsedMax) ? undefined : parsedMax;

  try {
    return await searchProducts({
      category,
      query,
      minPrice: parseOptionalNumber(rawMinPrice),
      maxPrice: parseOptionalNumber(rawMaxPrice),
    });
    // {products: [...], error: null}
  } catch (error) {
    return {
      products: [],
      error: error instanceof Error ? error.message : 'The product could not be loaded',
    };
    // {products: [], error: "..."}
  }
}

const Search = () => {
  // {
  //   products: [...]
  //   error: null
  // }
  const initalState = use(productsPromise);
  const [state, formAction] = useActionState(searchAction, initalState);

  return (
    <div className='flex flex-col items-center'>
      <SearchForm formAction={formAction} />
      {state.error && (
        <p className='mt-3 max-w-lg text-sm whitespace-pre-wrap text-red-600' role='alert'>
          {state.error}
        </p>
      )}
      <SearchResults products={state.products} />
      <Instructions path='/search.md' />
    </div>
  );
};

export default Search;
