import { useRef } from 'react';
import { Link, NavLink } from 'react-router';

import { useBooking } from '../../contexts/BookingContext';
import { useTheme } from '../../contexts/ThemeContext';

const NavBar = () => {
  const { theme, changeTheme } = useTheme();
  const { bookingState } = useBooking();

  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className='navbar bg-base-100 shadow-sm'>
      <div className='flex-1'>
        <Link className='btn btn-ghost text-xl' to='/'>
          Travel Agency
        </Link>
        <select
          defaultValue={theme}
          className='select select-success'
          onChange={(event) => {
            changeTheme(event.target.value);
          }}
        >
          <option disabled>Pick a color</option>
          <option value='halloween'>Halloween</option>
          <option value='cyberpunk'>Cyberpunk</option>
          <option value='dim'>Dim</option>
          <option value='abyss'>Abyss</option>
          <option value='retro'>Retro</option>
          <option value='lemonade'>Lemonade</option>
          <option value='caramellatte'>Caramellatte</option>
          <option value='lofi'>lofi</option>
        </select>

        <button
          className='cursor-pointer'
          onClick={() => {
            dialogRef.current?.showModal();
          }}
        >
          Open modal
        </button>
        <dialog ref={dialogRef} className='inset-1/2 border-cyan-500 bg-indigo-700 p-3'>
          Hallo im Dialog
        </dialog>
        {/* <button commandfor='my-dialog' command='show-modal' className='cursor-pointer'>
          Open modal
        </button>
        <dialog id='my-dialog' className='inset-1/2 border-cyan-500 bg-indigo-700 p-3'>
          Hallo im Dialog
        </dialog> */}

        {bookingState.premium && (
          <span className='badge badge-success ml-2 animate-pulse'>Premium freigeschaltet</span>
        )}
      </div>
      <nav className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? 'underline underline-offset-2' : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              className={({ isActive }) => (isActive ? 'underline underline-offset-2' : '')}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/destinations'
              className={({ isActive }) => (isActive ? 'underline underline-offset-2' : '')}
            >
              Destinations
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/contact'
              className={({ isActive }) => (isActive ? 'underline underline-offset-2' : '')}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
