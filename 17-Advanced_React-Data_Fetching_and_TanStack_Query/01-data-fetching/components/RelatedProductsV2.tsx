import { use } from 'react';

import type { Product } from './product';

const RelatedProductsV2 = ({ promise }: { promise: Promise<Product[]> }) => {
  const products = use(promise);

  return (
    <div>
      <h2>Related Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedProductsV2;
