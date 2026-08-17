const SearchForm = () => {
  return (
    <form className='w-full max-w-4xl'>
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
            />
          </div>
          <div className='flex justify-end md:items-end'>
            <button type='submit' className='btn btn-neutral mt-1 w-full md:mt-0 md:w-auto'>
              Search
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default SearchForm;
