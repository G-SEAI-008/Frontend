// oxlint-disable jsdoc/require-returns
import './NavBar.css';

// # Darstellung durch Props steuern
// * user und title machen dieselbe Komponente mit unterschiedlichen Inhalten wiederverwendbar.
function NavBar({ user, title }) {
  // console.log(props);

  // const title = props.title;
  // const { title } = props;
  // const nav-item = "cursor-pointer rounded px-3 py-1 text-[#432818] transition-colors hover:bg-orange-100 hover:text-orange-900"

  // * Die Darstellung wird aus dem aktuellen Prop-Wert abgeleitet und bei einer Änderung automatisch neu berechnet.
  // ! Props sind schreibgeschützt; Änderungen müssen von der übergeordneten Komponente kommen.
  return (
    <nav className='bg-orange-300 p-2'>
      <h2>{title}</h2>
      <p className={user === 'Renke' ? 'bg-red-500' : 'bg-green-500'}>Welcome, {user}</p>
      <ul className='flex justify-around font-bold'>
        <li className='nav-item'>Home</li>
        <li className='nav-item'>Contact</li>
        <li className='nav-item'>About</li>
      </ul>
    </nav>
  );
}

// function greet(name) {
//   console.log('Hello ' + name);
// }

// greet('Daniel');
// greet('Eric');

const name = 'Muju';
const email = 'muju@wbscodingschool.com';

export { name, email };
export default NavBar;
