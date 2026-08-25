import { useState } from 'react';
import type { ReactNode } from 'react';

import { ThemeContext, themes } from './ThemeContext';
import type { Theme } from './ThemeContext';

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
