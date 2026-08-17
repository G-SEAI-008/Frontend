const SearchResults = ({ products }) => {
  return (
    <div className='mx-auto mt-6 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5'>
      {products.length === 0 ? (
        <div className='col-span-full text-center text-gray-500'>No products found.</div>
      ) : (
        products.map((product) => (
          <div key={product.id} className='card bg-base-100 rounded-box border p-4 shadow-lg'>
            <div className='flex h-48 items-center justify-center rounded bg-white'>
              <img
                src={product.image}
                alt={product.title}
                className='h-full max-h-48 object-contain'
              />
            </div>
            <div className='mt-4'>
              <h2 className='line-clamp-1 text-lg font-bold'>{product.title}</h2>
              <p className='mt-1 line-clamp-2 text-sm text-gray-600'>{product.description}</p>
              <div className='mt-2 font-semibold'>${product.price}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
