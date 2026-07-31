import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { name, email } from './components/NavBar';

function App() {
  // # JavaScript

  const add = (num1, num2) => num1 + num2;

  // # return mit JSX
  return (
    // JSX fragment
    <>
      <NavBar />
      <NavBar />
      <h1>Hello {name.toUpperCase()}</h1>
      <h2>Sum of 4 and 5 is: {add(4, 5)}</h2>
      <Footer />
    </>
  );
}

export default App;
