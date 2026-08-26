// This component should receive a `name` string prop, if no name is passed, render 'Hello Stranger'
// const Greeting = ({ name = 'Stranger' }: { name?: string }) => {
//   return <h1>Hello, {name}!</h1>;
// };

const Greeting = ({ name }: { name?: string }) => {
  // oxlint-disable-next-line typescript/prefer-nullish-coalescing typescript/strict-boolean-expressions
  return <h1>Hello, {name || 'Stranger'}!</h1>;
  // return <h1>Hello, {name ? name : 'Stranger'}!</h1>;
};

export default Greeting;
