import { useState } from 'react';

const Counter = ({ darkTheme, text }) => {
  const [counter, setCounter] = useState(0);

  // {
  //   darkTheme: true,
  //   text: 'Hello'
  // }
  // const darkTheme = props.darkTheme;
  // const text = props.text;

  // const handleClick = () => {
  //   // # Direct state update - Wenn der vorherige Wert nicht relevant ist und einfach nur durch den neuen Wert überschrieben werden soll
  //   // setCounter(2); // <-- sagt React: "plane ein State-Update/Re-Render" // * 0 + 1 = 1
  //   // # Functional state update - wenn der vorherige Wert relevant ist
  //   setCounter((previousValue) => previousValue + 1);
  //   // console.log("New value of counter:", counter); // <-- loggt den *alten/aktuellen* Wert
  // };

  // const increaseCounter = () => {
  //   setCounter((previousValue) => previousValue + 1);
  // };

  // const decreaseCounter = () => {
  //   setCounter((previousValue) => previousValue - 1);
  // };

  const handleclick = (e) => {
    const operation = e.target.value;
    if (operation === '+') {
      setCounter((prev) => prev + 1);
    } else if (operation === '-') {
      //   if (counter <= 0) {
      //     return;
      //   }
      //   setCounter((prev) => prev);
      setCounter((prev) => (prev <= 0 ? 0 : prev - 1));
    }
  };

  const textColor = darkTheme ? 'text-white' : 'text-black';

  return (
    <>
      <div
        className={`flex w-36 justify-between border-2 ${darkTheme ? 'border-gray-100' : 'border-black'}`}
      >
        <button
          onClick={handleclick}
          value='+'
          className={'w-12 cursor-pointer bg-green-400 p-4 font-bold ' + textColor}
        >
          +
        </button>
        <span className={`p-4 ${textColor}`}>{counter}</span>
        <button
          disabled={counter === 0 ? true : false}
          onClick={handleclick}
          value='-'
          // className={
          //   counter === 0
          //     ? 'w-12 bg-gray-400 p-4 font-bold'
          //     : 'w-12 cursor-pointer bg-red-400 p-4 font-bold'
          // }
          className={`w-12 p-4 font-bold ${counter === 0 ? 'bg-gray-400' : 'cursor-pointer bg-red-400'} ${textColor}`}
        >
          -
        </button>
      </div>

      <button
        onClick={() => setCounter(0)}

        className='mt-1 cursor-pointer bg-gray-300 p-2'
      >
        Clear
      </button>
    </>
  );
};

export default Counter;
