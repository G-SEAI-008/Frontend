import Card from './components/Card';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { name, email } from './components/NavBar';
import StudentsList from './components/StudentsList';

function App() {
  const add = (num1, num2) => num1 + num2;

  // # Formularereignisse kontrollieren
  // * Der Wert wird erst beim Absenden aus dem Formular-Event gelesen; dafür ist kein zusätzlicher React-State nötig.
  const handleSubmit = (event) => {
    // ! Ohne preventDefault würde der Browser das Formular klassisch absenden und die Seite neu laden.
    event.preventDefault();
    console.log(event.target['user-email'].value);
  };

  return (
    <>
      {/* <NavBar
        title='React Fundamentals'
        user='Renke'
        age={31}
        admin={true}
         /> */}
      {/* <NavBar title='Katzenfutter' user='Kevin' /> */}
      <NavBar title='Dashboard' user='Christopher' />
      <h1>Hello {name.toUpperCase()}</h1>
      <h2>Sum of 4 and 5 is: {add(4, 5)}</h2>

      <StudentsList />

      <button
        className='cursor-pointer rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        onClick={() => {
          // * Der Callback wird erst durch den Klick ausgeführt und nicht bereits während des Renderns.
          alert('Button was clicked');
        }}
      >
        Alert
      </button>

      <form onSubmit={handleSubmit}>
        <input type='email' name='user-email' id='email' placeholder='email' className='border-2' />
        <button className='cursor-pointer rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'>
          Submit email
        </button>
      </form>

      <Footer />

      {/* <Button onClick={handleDelete} /> */}

      {/* <Card>
        <h2>Hello!</h2>
        <p>This text is inside the card.</p>
      </Card> */}
    </>
  );
}

export default App;
