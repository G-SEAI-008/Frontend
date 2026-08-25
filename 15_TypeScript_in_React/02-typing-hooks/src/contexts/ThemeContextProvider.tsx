import type { ReactNode } from 'react';
import { useState } from 'react';

import type { Theme } from './ThemeContext';
import { ThemeContext, themes } from './ThemeContext';

type ThemeContextProviderProps = { children: ReactNode };

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [theme, setTheme] = useState<Theme>('halloween');

  const changeTheme = (newTheme: string) => {
    const selectedThemes = themes.find((themeName) => themeName === newTheme);

    if (selectedThemes) {
      setTheme(selectedThemes);
    }
  };

  return <ThemeContext value={{ theme, changeTheme }}>{children}</ThemeContext>;
};

export default ThemeContextProvider;
