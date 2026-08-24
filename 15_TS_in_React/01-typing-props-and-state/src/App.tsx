import './App.css';
import Button from './components/Button';
import UserProfile from './components/UserProfile';

const user = {
  username: 'Guybrush',
  img: 'https://tse1.mm.bing.net/th/id/OIP.RsW3Z2PMxGQwMa2LZzvOngHaFZ?cb=12&pid=Api',
  info: 'Info Text',
  status: true,
};

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
