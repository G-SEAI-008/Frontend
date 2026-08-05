// oxlint-disable arrow-body-style
import { useState } from 'react';

import LightBulb from './components/LightBulb';

import './index.css';

const App = () => {
  const [lightSwitch, setLightSwitch] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    if (counter < 10) {
      // setLightSwitch(lightSwitch === false ? true : false);
      setLightSwitch((prev) => !prev);
      setCounter((c) => (lightSwitch ? c + 1 : c));
    }
  };

  return (
    <>
      <button disabled={counter >= 10} onClick={handleClick}>
        {lightSwitch ? 'Switch off' : 'Switch on'}
      </button>

      <button onClick={() => setCounter(0)}>Reset</button>

      <LightBulb lightSwitch={lightSwitch} />
    </>
  );
};

export default App;
