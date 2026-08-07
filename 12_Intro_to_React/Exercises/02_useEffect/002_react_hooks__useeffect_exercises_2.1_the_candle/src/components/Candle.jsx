import { useEffect, useState } from 'react';

const Candle = () => {
  const [height, setHeight] = useState(85);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeight((prev) => prev - 10);
    }, 2000); // alle 2 Sekunden

    return () => clearInterval(interval);
  }, []);

  const makeCandleSmaller = () => {
    // Functional state update: Neuer Wert hängt vom alten Wert ab
    setHeight((prev) => prev - 10);
  };

  const replaceCandle = () => {
    // Direct state update: Alter Wert ist nicht relevant und wird einfach ersetzt
    setHeight(85);
  };

  return (
    <div className='exercise'>
      <button onClick={makeCandleSmaller}>Kerze kleiner machen</button>
      <button onClick={replaceCandle}>Durch neue Kerze ersetzen</button>
      <div className='candleContainer'>
        {height > 10 && (
          <div className='candle' style={{ height: `${height}%` }}>
            <div className='flame'>
              <div className='shadows' />
              <div className='top' />
              <div className='middle' />
              <div className='bottom' />
            </div>
            <div className='wick' />
            <div className='wax' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Candle;
