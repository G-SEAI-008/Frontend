// oxlint-disable no-shadow
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ProductSchema } from './product';
import type { Product } from './product';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) {
          throw new Error('Fetch failed');
        }
        const data: unknown = await res.json();
        const parsedProducts = ProductSchema.array().parse(data);
        // console.log(parsedProducts);
        setProducts(parsedProducts);
        // setProducts(ProductSchema.array().parse(await res.json()));
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unkown error');
      } finally {
        setLoading(false);
      }
    };

    void fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link href={`/product/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
