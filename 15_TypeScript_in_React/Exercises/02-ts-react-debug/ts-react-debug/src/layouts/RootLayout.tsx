import { NavLink, Outlet } from 'react-router';
import type { NavLinkRenderProps } from 'react-router';

import { useFavorites } from '../contexts/FavoritesContext';

const navClass = ({ isActive }: NavLinkRenderProps) => (isActive ? 'nav active' : 'nav');

const RootLayout = () => {
  const { favorites } = useFavorites();

  return (
    <div className='app'>
      <header className='app-header'>
        <h1>WBS Events</h1>
        <nav>
          <NavLink to='/' end className={navClass}>
            All events
          </NavLink>
          <NavLink to='/favorites' className={navClass}>
            Favorites ({favorites.length})
          </NavLink>
        </nav>
      </header>
      <main className='app-main'>
        <Outlet />
      </main>
      <footer className='app-footer'>Built with 🤍</footer>
    </div>
  );
};

export default RootLayout;
