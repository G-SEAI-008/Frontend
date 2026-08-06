// oxlint-disable arrow-body-style promise/prefer-await-to-then

import { useEffect, useState } from 'react';

const Effect = () => {
  const [todo, setTodo] = useState(null);
  const [count, setCount] = useState(0);
  const [myObj, setMyObj] = useState({ test: 42 });

  // # Effect beim Mounting
  // * Das leere Abhängigkeitsarray führt diesen Fetch nur nach dem Mounting der Komponente aus.
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.json())
      .then((data) => setTodo(data));
  }, []);

  // # Render und Effect unterscheiden
  // ! Dieser Aufruf liegt außerhalb von useEffect und läuft bei jedem Render in der Render-Phase.
  // useEffect(() => {
  console.log('Wird nach jedem Render ausgeführt');
  // });

  // # Effect mit einer Abhängigkeit
  // * React führt den Effect nach dem Mounting und nach jedem Re-render mit geändertem count aus.
  useEffect(() => {
    console.log(count);
    console.log("Wird immer ausgeführt, nachdem sich 'count' geändert hat");
  }, [count]);

  // # Objekte als Abhängigkeit
  // ! React vergleicht Objekte über ihre Referenz. Eine neue Referenz würde den Effect erneut auslösen.
  useEffect(() => {
    console.log(myObj);
    console.log("Wird immer ausgeführt, nachdem sich 'myObj' geändert hat");
  }, [myObj]);

  // # Ressourcen im Cleanup freigeben
  // * Der Effect registriert den Listener einmal; sein Rückgabewert entfernt ihn beim Unmounting.
  useEffect(() => {
    const handleResize = (e) => {
      console.log(e.target.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // * React ruft den Cleanup vor dem nächsten Effect-Durchlauf und beim Unmounting auf.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {todo && <p>{todo.title}</p>}
      <button onClick={() => setCount((c) => c + 1)}>Zähler: {count}</button>
    </div>
  );
};

export default Effect;
