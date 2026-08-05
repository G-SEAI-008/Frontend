import { useState } from 'react';

import Counter from './components/Counter';

import './index.css';

const App = () => {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  return (
    <div>
      <h1>React: useState</h1>
      <div style={{ display: 'flex' }}>
        <Counter state={counter1} setter={setCounter1} />
        <Counter state={counter2} setter={setCounter2} />
        <Counter state={counter3} setter={setCounter3} />
      </div>
    </div>
  );
};

export default App;
