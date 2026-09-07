import ProductList from '@/app/products/ProductList';
import { getProducts } from '@/lib/product-api';

const HomePage = async () => {
  const products = await getProducts();

  return (
    <>
      <h1 className='mb-6 text-2xl font-bold'>Products</h1>
      <ProductList products={products} />
    </>
  );
};

export default HomePage;
