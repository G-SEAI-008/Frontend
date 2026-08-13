import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { BrowserRouter } from 'react-router';

import App from './App.jsx';
import BookingContextProvider from './contexts/BookingContext.jsx';
import ThemeContextProvider from './contexts/ThemeContextProvider.jsx';

createRoot(document.getElementById('root')).render(
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
