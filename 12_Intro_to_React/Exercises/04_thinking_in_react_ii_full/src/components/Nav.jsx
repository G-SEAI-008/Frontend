const Nav = ({ isDark, toggleDark }) => {
  return (
    <div>
      <label className='flex cursor-pointer gap-2'>
        <input type='checkbox' checked={isDark} onChange={toggleDark} />
        <span className='dark:text-white'>Dark Mode?</span>
      </label>
    </div>
  );
};

export default Nav;
