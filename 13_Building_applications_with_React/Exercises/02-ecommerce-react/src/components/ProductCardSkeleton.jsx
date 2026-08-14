const ProductCardSkeleton = () => {
  return (
    <div className='card bg-base-100 shadow-xl'>
      <div className='skeleton h-56'></div>
      <div className='card-body'>
        <div className='skeleton h-8 w-64'></div>
        <div className='skeleton h-4 w-24'></div>
        <div className='card-actions justify-end'>
          <span className='btn skeleton w-36'></span>
          <span className='btn skeleton w-36'></span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
