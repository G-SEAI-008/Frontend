import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.jsx';
import TodoContextProvider from './contexts/TodoContex.jsx';
import TodoReducerProvider from './contexts/TodoReducerContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <TodoContextProvider> */}
    <TodoReducerProvider>
      <App />
    </TodoReducerProvider>
    {/* </TodoContextProvider> */}
  </StrictMode>,
);
