// oxlint-disable no-shadow
'use client';

import { useEffect, useState } from 'react';

import { ProductSchema } from './product';
import type { Product } from './product';

const RelatedProducts = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelated = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`,
        );
        if (!res.ok) {
          throw new Error('Failed to load related products');
        }

        const data: unknown = await res.json();
        const parsedProducts = ProductSchema.array().parse(data);
        setProducts(parsedProducts);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    void fetchRelated();
  }, [category]);

  if (loading) {
    return <p>Loading related products...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

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
export default RelatedProducts;
