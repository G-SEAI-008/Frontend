import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

import { Footer, NavBar } from '../components';
import { useBooking } from '../contexts/BookingContext';
import { useTheme } from '../contexts/ThemeContext';

const MainLayout = () => {
  const [destinations, setDestinations] = useState(null);

  const { theme } = useTheme();
  const { bookingState } = useBooking();

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
    <div
      className='flex min-h-screen flex-col'
      data-theme={bookingState.premium ? `${theme}` : 'halloween'}
    >
      {/*  */}
      <NavBar />
      <main className='container mx-auto mb-auto px-4 py-4'>
        {destinations ? (
          <Outlet context={{ destinations }} />
        ) : (
          <span className='loading loading-spinner loading-xl'></span>
        )}
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
