import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { CartProvider } from '@/app/cart/CartContext';

import './globals.css';

const metadata: Metadata = {
  title: 'Fake Store',
  description: 'A small Next.js teaching project',
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang='en'>
      <body className='bg-white font-sans text-black'>
        <CartProvider>
          <div className='mx-auto max-w-6xl px-4'>
            <header className='navbar flex-wrap justify-between border-b'>
              <Link href='/' className='cursor-pointer text-xl font-bold'>
                Shop
              </Link>
              <nav className='flex gap-4'>
                <Link href='/' className='cursor-pointer'>
                  Products
                </Link>
                <Link href='/cart' className='cursor-pointer'>
                  Cart
                </Link>
                <Link href='/admin/add' className='cursor-pointer'>
                  Add Product
                </Link>
              </nav>
            </header>
            <main className='py-8'>{children}</main>
          </div>
        </CartProvider>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
