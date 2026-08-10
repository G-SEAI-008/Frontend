import { Link, NavLink } from 'react-router';

export default function Header() {
  return (
    <header className='header'>
      <Link to='/'>
        <h1>Webb Gallery</h1>
        <p>
          Fancy stars
          <span role='img' aria-label='Star'>
            💫
          </span>
        </p>
      </Link>
      <nav>
        <ul>
          <li>
            {/* <a className='navlink' href='/'>
              Home
            </a> */}
            {/* <button className='navlink' onClick={() => setRoute('stars')}>
              Home
            </button> */}
            <NavLink to='/' className='navlink'>
              Home
            </NavLink>
          </li>
          <li>
            {/* <a className='navlink' href='/'>
              Alpha Centauri
            </a> */}
            {/* <button className='navlink' onClick={() => setRoute('alphaCentauri')}>
              Alpha Centauri
            </button> */}
            <NavLink to='alpha-centauri' className='navlink'>
              Alpha Centauri
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
