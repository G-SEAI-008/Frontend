import { searchProducts } from '../api/index.js';
import { Instructions, SearchForm, SearchResults } from '../components';

const productsPromise = searchProducts();

const Search = () => {
  return (
    <div className='flex flex-col items-center'>
      <SearchForm />
      <SearchResults productsPromise={productsPromise} />
      <Instructions path='/search.md' />
    </div>
  );
};

export default Search;
