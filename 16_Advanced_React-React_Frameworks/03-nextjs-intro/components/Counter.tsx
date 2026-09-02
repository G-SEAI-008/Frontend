'use client';

import { useEffect, useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('This log is from the client side?');
  }, [count]);

  return (
    <>
      <p>Count: {count}</p>
      <button
        className='bg-foreground text-background cursor-pointer rounded px-2 py-1 hover:opacity-80'
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Increment
      </button>
    </>
  );
};

export default Counter;
