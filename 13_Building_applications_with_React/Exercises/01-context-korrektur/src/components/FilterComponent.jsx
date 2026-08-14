const FilterComponent = ({ setFilter }) => {
  const setFilterInView = (filter) => {
    setFilter(filter);
  };

  return (
    <div className='mb-4 flex space-x-2'>
      <button
        type='button'
        onClick={() => setFilterInView('all')}
        className='cursor-pointer rounded bg-gray-900 px-3 py-1'
      >
        All
      </button>
      <button
        type='button'
        onClick={() => setFilterInView('active')}
        className='cursor-pointer rounded bg-gray-900 px-3 py-1'
      >
        Active
      </button>
      <button
        type='button'
        onClick={() => setFilterInView('completed')}
        className='cursor-pointer rounded bg-gray-900 px-3 py-1'
      >
        Completed
      </button>
    </div>
  );
};

export default FilterComponent;
