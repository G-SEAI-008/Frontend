import type { Metadata } from 'next';

import './globals.css';
import Link from 'next/link';

import Providers from './providers';

export const metadata: Metadata = {
  title: 'TanStack Query',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className='h-full antialiased'>
      <body>
        <Providers>
          <nav className='mb-4 flex gap-4'>
            <Link className='link' href='/'>
              Home
            </Link>
            <Link className='link' href='/posts'>
              Posts
            </Link>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
