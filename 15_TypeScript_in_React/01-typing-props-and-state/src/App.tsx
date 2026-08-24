import './App.css';
import Button from './components/Button';
import UserProfile from './components/UserProfile';
import { user } from './data/data';

const clickHandler = () => {
  console.log('clicked');
};

function App() {
  return (
    <>
      <UserProfile username={user.username} img={user.img} info={user.info} status={user.status} />
      {/* <Button label='Klick mich' onClick={clickHandler} /> */}
      <Button
        username={user.username}
        type='button'
        style={{ backgroundColor: 'green', width: 70 }}
        // className='bg-emerald-600 text-lg'
        onClick={() => {
          console.log('Hallo Eric');
        }}
      >
        Click me <span>👍</span>
      </Button>
    </>
  );
}

export default App;
