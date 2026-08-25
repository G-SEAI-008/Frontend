import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { BrowserRouter } from 'react-router';

import App from './App';
import BookingContextProvider from './contexts/BookingContext';
import ThemeContextProvider from './contexts/ThemeContextProvider';

// createRoot(document.getElementById('root')!).render(
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Could not find the root element');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <BookingContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </BookingContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
