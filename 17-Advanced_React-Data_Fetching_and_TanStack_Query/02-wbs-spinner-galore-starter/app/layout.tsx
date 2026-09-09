import type { Metadata } from 'next';

import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'WBS Spinner Galore',
  description: 'Daten laden mit Next.js, Suspense und use.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='de'>
      <body>
        <header>
          <nav>
            <Link href='/'>WBS Spinner Galore</Link>
            <Link href='/pokemon'>Pokémon</Link>
            <Link href='/posts'>Posts</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
