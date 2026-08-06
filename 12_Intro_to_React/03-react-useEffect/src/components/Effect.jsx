// oxlint-disable promise/prefer-await-to-then
import { useEffect, useState } from 'react';

const Effect = () => {
  const [todo, setTodo] = useState(null);
  const [count, setCount] = useState(0);
  const [myObj, setMyObj] = useState({ test: 42 });

  //   useEffect(callbackfunc, depencyArray);
  // # Effect beim Mounting
  // * Der Callback enthält den Side Effect; das Dependency Array bestimmt, wann React ihn erneut ausführt.
  // * Das leere Dependency Array führt diesen Fetch nur nach dem Mounting der Component aus.
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.json())
      .then((data) => setTodo(data));
  }, []);

  // # Render und Effect unterscheiden
  // ! Dieser Aufruf liegt außerhalb von useEffect und läuft bei jedem Render in der Render-Phase.
  // * Die auskommentierte Effect zeigt, dass es keinen Unterschied macht, zu einem Effect OHNE Dependency-Array.
  // useEffect(() => {
  console.log('Wird nach jedem Render ausgeführt');
  // });

  // # Effect mit einer Dependency
  // * React führt den Effect nach dem Mounting und nach jedem Re-render mit geändertem count aus.
  useEffect(() => {
    console.log(count);
    console.log("Wird immer ausgeführt, nachdem sich 'count' geändert hat");
  }, [count]);

  // # Objekt als Dependency
  // const myObj = { test: 42 };
  // ! React vergleicht Objekte über ihre Referenz. Eine neue Referenz würde den Effect erneut auslösen.
  // ! Ohne React Compiler oder eine andere Stabilisierung erzeugt diese Variante bei jedem Re-render eine neue Referenz.
  // * Die State-Variante hält die Referenz stabil, bis setMyObj einen anderen Wert setzt.
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

    // Cleanup in return
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
