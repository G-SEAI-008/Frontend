// oxlint-disable arrow-body-style
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';

import './index.css';

const App = () => {
  return (
    <>
      <Header />
      <Hero />
      <main>
        <Services />
      </main>
      <Footer />
    </>
  );
};

export default App;
