import { useState } from 'react';

import { ThemeContext } from './ThemeContext';

const allowedThemes = new Set([
  'halloween',
  'cyberpunk',
  'dim',
  'abyss',
  'retro',
  'lemonade',
  'caramellatte',
  'lofi',
]);

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('halloween');

  const changeTheme = (newTheme) => {
    if (allowedThemes.has(newTheme)) {
      setTheme(newTheme);
    }
  };

  // return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
  return <ThemeContext value={{ theme, changeTheme }}>{children}</ThemeContext>;
};

export default ThemeContextProvider;
