import { Link, NavLink } from 'react-router';

import { useTheme } from '../../contexts/ThemeContext';

const NavBar = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <div className='navbar bg-base-100 shadow-sm'>
      <div className='flex-1'>
        <Link className='btn btn-ghost text-xl' to='/'>
          Travel Agency
        </Link>
        <select
          defaultValue={theme}
          className='select select-success'
          onChange={(e) => changeTheme(e.target.value)}
        >
          <option disabled={true}>Pick a color</option>
          <option value='halloween'>Halloween</option>
          <option value='cyberpunk'>Cyberpunk</option>
          <option value='dim'>Dim</option>
          <option value='abyss'>Abyss</option>
          <option value='retro'>Retro</option>
          <option value='lemonade'>Lemonade</option>
          <option value='caramellatte'>Caramellatte</option>
          <option value='lofi'>lofi</option>
        </select>
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
