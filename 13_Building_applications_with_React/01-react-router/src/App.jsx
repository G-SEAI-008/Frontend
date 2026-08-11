import { Route, Routes } from 'react-router';

import MainLayout from './layouts/MainLayout';
import AlphaCentauri from './pages/AlphaCentauri';
import SingleStar from './pages/SingleStar';
import Stars from './pages/Stars';

function App() {
  // const [route, setRoute] = useState('stars');

  // let mainComponent;

  // switch (route) {
  //   case 'stars': {
  //     mainComponent = <Stars />;
  //     break;
  //   }
  //   case 'alphaCentauri': {
  //     mainComponent = <AlphaCentauri />;
  //     break;
  //   }
  //   default: {
  //     mainComponent = <h1>Not Found</h1>;
  //   }
  // }

  // return (
  //   <div className='body'>
  //     <Header setRoute={setRoute} />
  //     <main>{mainComponent}</main>
  //     <footer>© footerbla</footer>
  //   </div>
  // );

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Stars />} />
        <Route path='/alpha-centauri' element={<AlphaCentauri />} />
        <Route path='/star/:slug' element={<SingleStar />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
