import { use } from 'react';
import { createContext } from 'react';

const themes = [
  'halloween',
  'cyberpunk',
  'dim',
  'abyss',
  'retro',
  'lemonade',
  'caramellatte',
  'lofi',
] as const;

//[number] → Gib mir den Typ aller Werte, die an einer beliebigen Zahlposition stehen können.
type Theme = (typeof themes)[number];

type ThemeContextValue = {
  theme: Theme;
  changeTheme: (newTheme: string) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const useTheme = () => {
  const context = use(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeContextProvider');
  }

  return context;
};

export { ThemeContext, useTheme, themes };
export type { Theme };
