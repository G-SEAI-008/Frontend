import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getProductsByCategory } from '@/api/fakeStore';
import { ProductGrid } from '@/components';

const Category = () => {
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      try {
        setProducts(await getProductsByCategory(name));
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [name]);

  return (
    <div className='grid grid-cols-4 gap-5 py-5'>
      <ProductGrid loading={loading} products={products} skeletonCount={4} />
    </div>
  );
};

export default Category;
