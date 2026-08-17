import { useState } from 'react';

import SubmitButton from './SubmitButton';

const initalFilters = {
  category: '',
  minPrice: '',
  maxPrice: '',
  query: '',
};

const SearchForm = ({ formAction }) => {
  const [filters, setFilters] = useState(initalFilters);

  const handlechange = (event) => {
    const { name, value } = event.target;

    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }));
  };

  return (
    <search className='w-full max-w-4xl'>
      <form action={formAction} className='w-full'>
        <fieldset className='bg-base-200 border-base-300 rounded-box border p-4'>
          <legend className='fieldset-legend mb-2'>Search Products</legend>
          <div className='grid grid-cols-1 items-end gap-4 md:grid-cols-5'>
            <div className='flex flex-col'>
              <label htmlFor='category' className='label text-sm font-medium'>
                Category
              </label>
              <input
                id='category'
                className='input input-bordered w-full'
                name='category'
                placeholder='Category'
                value={filters.category}
                onChange={handlechange}
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='minPrice' className='label text-sm font-medium'>
                Min Price
              </label>
              <input
                id='minPrice'
                type='number'
                className='input input-bordered w-full'
                name='minPrice'
                placeholder='Min'
                value={filters.minPrice}
                onChange={handlechange}
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='maxPrice' className='label text-sm font-medium'>
                Max Price
              </label>
              <input
                id='maxPrice'
                type='number'
                className='input input-bordered w-full'
                name='maxPrice'
                placeholder='Max'
                value={filters.maxPrice}
                onChange={handlechange}
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='query' className='label text-sm font-medium'>
                Description
              </label>
              <input
                id='query'
                className='input input-bordered w-full'
                name='query'
                placeholder='Search keyword'
                value={filters.query}
                onChange={handlechange}
              />
            </div>
            <div className='flex justify-end md:items-end'>
              <SubmitButton pendingLabel='Searching...'>Search</SubmitButton>
            </div>
          </div>
        </fieldset>
      </form>
    </search>
  );
};

export default SearchForm;
