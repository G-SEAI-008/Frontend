import { Route, Routes } from 'react-router';

import AlphaCentauri from './components/AlphaCentauri';
import Header from './components/Header';
import Stars from './components/Stars';

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
    <div className='body'>
      <Header />
      <Routes>
        <Route path='/' element={<Stars />} />
        <Route path='/alpha-centauri' element={<AlphaCentauri />} />
      </Routes>
      <footer>© footerbla</footer>
    </div>
  );
}

export default App;
