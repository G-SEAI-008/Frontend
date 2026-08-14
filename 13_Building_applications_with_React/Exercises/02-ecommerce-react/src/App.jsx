import { Route, Routes } from 'react-router';

import { MainLayout } from '@/layouts';
import { Cart, Category, Home } from '@/pages';

const App = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path='category/:name' element={<Category />} />
      <Route path='cart' element={<Cart />} />
    </Route>
  </Routes>
);

export default App;
