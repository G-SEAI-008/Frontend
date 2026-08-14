import { useEffect, useState } from 'react';

import { getProducts } from '@/api/fakeStore';
import { CategoryLinks, ProductGrid } from '@/components';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProducts(await getProducts());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className='space-y-5 py-5'>
      <div className='flex flex-nowrap gap-4'>
        <CategoryLinks />
      </div>
      <div className='grid grid-cols-4 gap-5'>
        <ProductGrid loading={loading} products={products} skeletonCount={20} />
      </div>
    </div>
  );
};

export default Home;
