'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import type { Product } from '@/lib/products';

import { useCart } from '../cart/CartContext';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  const { addToCart } = useCart();
  const [message, setMessage] = useState('');

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setMessage(`${product.title} added to cart`);
    globalThis.setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  return (
    <>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {products.map((product, index) => (
          <article key={product.id} className='flex flex-col gap-2'>
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              sizes='(max-width: 520px) 100vw, 300px'
              loading={index < 4 ? 'eager' : 'lazy'}
              className='aspect-square w-full bg-gray-100 object-contain p-4'
            />
            {/* Image with src "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png" was detected as the Largest Contentful Paint (LCP). Please add the `loading="eager"` property if this image is above the fold.
Read more: https://nextjs.org/docs/app/api-reference/components/image#loading */}

            <span className='text-sm text-gray-500'>{product.category}</span>
            <h2 className='font-semibold'>
              <Link href={`/products/${product.id}`} className='cursor-pointer'>
                {product.title}
              </Link>
            </h2>
            <span>${product.price.toFixed(2)}</span>

            <button
              type='button'
              onClick={() => {
                handleAddToCart(product);
              }}
              className='button mt-auto'
            >
              Add to cart
            </button>
          </article>
        ))}
      </div>

      {message && (
        <output className='fixed bottom-4 left-1/2 -translate-x-1/2 bg-black p-3 text-white'>
          {message}
        </output>
      )}
    </>
  );
};

export default ProductList;
