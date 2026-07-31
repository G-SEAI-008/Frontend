// const logHello = () => {
//   console.log('Bye');
// };
// function logHello() {}

// logHello();
// logHello();
// logHello();

// function NavBar() {}

// # Components sind immer PascalCase geschrieben
const NavBar = () => {
  const navBarText = 'Navigation Bar';

  const displayText = () => navBarText;

  // * JSX nur mit Expressions, nicht mit Statements
  return (
    <nav>
      <h1>{displayText}</h1>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  ); // # JSX => JavaScript XML
};

// const navBar = document.createElement('nav');
// navBar.textContent = 'Navigation Bar';
