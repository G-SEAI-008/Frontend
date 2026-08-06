import { useState } from 'react';

import Effect from './components/Effect';
import FetchInEffect from './components/FetchInEffect';

const App = () => {
  // # Mounting und Unmounting der Effect-Komponente
  // * toggle steuert, ob React Effect mountet oder unmountet.
  // * Beim Unmounting führt React die Cleanup-Funktionen der useEffects in Effect aus.
  const [toggle, setToggle] = useState(true);

  return (
    <>
      <input type='checkbox' checked={toggle} onChange={() => setToggle((t) => !t)} />
      {toggle && <Effect />}
      <FetchInEffect />
    </>
  );
};
export default App;
