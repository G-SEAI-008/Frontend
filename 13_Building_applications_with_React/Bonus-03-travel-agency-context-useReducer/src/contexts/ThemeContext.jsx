import { use } from 'react';
import { createContext } from 'react';

const ThemeContext = createContext('halloween');

const useTheme = () => use(ThemeContext);

export { ThemeContext, useTheme };
