import { Route, Routes } from 'react-router';

import { FavoritesProvider } from './contexts/FavoritesContext';
import RootLayout from './layouts/RootLayout';
import EventDetailPage from './pages/EventDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => (
  <FavoritesProvider>
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path='events/:eventId' element={<EventDetailPage />} />
        <Route path='favorites' element={<FavoritesPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  </FavoritesProvider>
);

export default App;
