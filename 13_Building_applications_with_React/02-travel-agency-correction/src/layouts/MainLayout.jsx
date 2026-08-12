import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { Footer, NavBar } from '../components';

const MainLayout = () => {
  const [destinations, setDestinations] = useState(null);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const res = await fetch('/travel.json');
        const data = await res.json();
        setDestinations(data);
      } catch (error) {
        console.error('Failed to load destinations:', error);
      }
    };

    loadDestinations();
  }, []);

  return (
    <div className='flex min-h-screen flex-col'>
      <NavBar />
      <main className='container mx-auto mb-auto px-4 py-4'>
        {destinations ? (
          <Outlet context={destinations} />
        ) : (
          <span className='loading loading-spinner loading-xl'></span>
        )}
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
