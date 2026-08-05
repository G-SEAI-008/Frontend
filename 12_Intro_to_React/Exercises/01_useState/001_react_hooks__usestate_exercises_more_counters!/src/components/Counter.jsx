// import { useState } from 'react';

const Counter = ({ state, setter }) => {
  //   const [count, setCounter] = useState(0);

  return (
    <div>
      <h2>Counter</h2>
      <button
        onClick={() => {
          setter((prev) => prev - 1);
        }}
      >
        -
      </button>
      <p>{state}</p>
      <button
        onClick={() => {
          setter((prev) => prev + 1);
        }}
      >
        +
      </button>
    </div>
  );
};
export default Counter;
