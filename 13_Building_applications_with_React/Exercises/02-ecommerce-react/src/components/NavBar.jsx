import { Link } from 'react-router';

import { useCart } from '@/context';

const CartLink = ({ cartCount }) => (
  <Link to='/cart' className='btn btn-ghost btn-circle'>
    <div className='indicator'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-5 w-5'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <title>Cart</title>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
        />
      </svg>
      <span className='badge badge-sm indicator-item'>{cartCount}</span>
    </div>
  </Link>
);

const NavBar = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='bg-secondary text-white'>
      <div className='navbar container mx-auto justify-between'>
        <div className='navbar-start'>
          <Link to='/' className='text-xl'>
            eCommerce<span>🤑</span>
          </Link>
        </div>
        <div className='navbar-end hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <CartLink cartCount={cartCount} />
            </li>
          </ul>
        </div>
        <div className='dropdown dropdown-bottom dropdown-end'>
          <button type='button' tabIndex={0} className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <title>Menu</title>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </button>
          <ul className='menu menu-sm dropdown-content bg-base-100 rounded-box text-secondary z-1 mt-3 w-52 p-2 shadow'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <CartLink cartCount={cartCount} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
