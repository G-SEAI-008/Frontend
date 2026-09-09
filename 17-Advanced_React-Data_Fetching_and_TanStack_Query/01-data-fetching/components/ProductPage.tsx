// oxlint-disable no-shadow
'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ProductSchema } from './product';
import type { Product } from './product';
import RelatedProducts from './RelatedProducts';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //   console.log(id);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
          throw new Error('Fetch failed');
        }
        const data: unknown = await res.json();
        const parsedProduct = ProductSchema.parse(data);
        setProduct(parsedProduct);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unkown error');
      } finally {
        setLoading(false);
      }
    };

    void fetchProduct();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!product) {
    return null;
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <p>${product.price}</p>
      <Image src={product.image} alt={product.title} width={100} height={100} />
      <p>Category: {product.category}</p>
      <RelatedProducts category={product.category} />
    </div>
  );
};
export default ProductPage;
