import { Suspense } from 'react';

import ProductDetailsV2 from '@/components/ProductDetailsV2';
import { fetchProduct, fetchRelated } from '@/lib/posts';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const productPromise = fetchProduct(id);
  // The category is only known after the product arrives.
  const loadRelated = async () => {
    const product = await productPromise;
    return fetchRelated(product.category);
  };
  const relatedPromise = loadRelated();

  return (
    <Suspense fallback={<p>Loading product...</p>}>
      <ProductDetailsV2 promise={productPromise} relatedPromise={relatedPromise} />
    </Suspense>
  );
};

export default Page;
