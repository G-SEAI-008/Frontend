import { use } from 'react';

import { TodoReducerContext } from '../contexts/TodoReducerContext';

const FilterComponent = () => {
  // const { setFilter } = use(TodoContext);
  const { setFilter } = use(TodoReducerContext);

  return (
    <div className='mb-4 flex space-x-2'>
      <button
        type='button'
        onClick={() => setFilter('all')}
        className='cursor-pointer rounded bg-gray-900 px-3 py-1'
      >
        All
      </button>
      <button
        type='button'
        onClick={() => setFilter('active')}
        className='cursor-pointer rounded bg-gray-900 px-3 py-1'
      >
        Active
      </button>
      <button
        type='button'
        onClick={() => setFilter('completed')}
        className='cursor-pointer rounded bg-gray-900 px-3 py-1'
      >
        Completed
      </button>
    </div>
  );
};

export default FilterComponent;
