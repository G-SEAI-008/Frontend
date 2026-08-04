import { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const [name, setName] = useState("Marco");

  const handleClick = () => {
    // # Direct state update - Wenn der vorherige Wert nicht relevant ist und einfach nur durch den neuen Wert überschrieben werden soll
    // setCounter(2); // <-- sagt React: "plane ein State-Update/Re-Render" // * 0 + 1 = 1
    // # Function state update - wenn der vorherige Wert relevant ist
    setCounter((previousValue) => previousValue + 1);
    // console.log("New value of counter:", counter); // <-- loggt den *alten/aktuellen* Wert
  };

  return (
    <>
      <div className="flex w-36 justify-between border-2">
        <button
          onClick={handleClick}
          className="w-12 cursor-pointer bg-green-400 p-4 font-bold"
        >
          +
        </button>
        <span className="p-4">{counter}</span>
        <button
          onClick={handleClick}
          className="w-12 cursor-pointer bg-red-400 p-4 font-bold"
        >
          -
        </button>
      </div>

      <button
        onClick={() => setCounter(0)}
        className="mt-1 cursor-pointer bg-gray-300 p-2"
      >
        Clear
      </button>
    </>
  );
};

export default Counter;
