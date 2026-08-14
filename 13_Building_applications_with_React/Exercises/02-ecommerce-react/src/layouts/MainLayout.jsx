import { Outlet } from 'react-router';

import { NavBar } from '@/components';
import { CartProvider } from '@/context';

const MainLayout = () => (
  <CartProvider>
    <NavBar />
    <main className='container mx-auto'>
      <Outlet />
    </main>
  </CartProvider>
);

export default MainLayout;
