'use client';

import Image from 'next/image';
import { Suspense, use } from 'react';

import type { Product } from './product';
import RelatedProductsV2 from './RelatedProductsV2';

type ProductDetailsV2Props = {
  promise: Promise<Product>;
  relatedPromise: Promise<Product[]>;
};

const ProductDetailsV2 = ({ promise, relatedPromise }: ProductDetailsV2Props) => {
  const product = use(promise);

  return (
    <div>
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      <Image src={product.image} alt={product.title} width={100} height={100} />
      <Suspense fallback={<p>Loading related products...</p>}>
        <RelatedProductsV2 promise={relatedPromise} />
      </Suspense>
    </div>
  );
};

export default ProductDetailsV2;
