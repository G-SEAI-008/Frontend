import { useState } from 'react';

import Counter from './components/Counter';

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  const labelTextColor = darkTheme ? 'text-white' : 'text-black';

  return (
    <main className={`min-h-screen ${darkTheme ? 'bg-slate-800' : 'bg-white'}`}>
      <label className={labelTextColor}>
        <input type='checkbox' onChange={toggleTheme} />
        Dark mode
      </label>

      <Counter darkTheme={darkTheme} text='Hello' />
      <Counter darkTheme={darkTheme} text='Hello' />
    </main>
  );
}

export default App;
