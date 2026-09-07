import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getProduct } from '@/lib/product-api';

const ProductPage = async ({ params }: PageProps<'/products/[id]'>) => {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <h1 className='mb-6 text-2xl font-bold'>Product</h1>
      <Image
        src={product.image}
        alt={product.title}
        width={600}
        height={600}
        className='max-w-xl object-contain'
      />
    </>
  );
};

export default ProductPage;
