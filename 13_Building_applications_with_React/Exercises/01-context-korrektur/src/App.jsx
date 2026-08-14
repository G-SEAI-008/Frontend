import { useState } from 'react';

import AddToDo from './components/AddToDo';
import FilterComponent from './components/FilterComponent';
import ToDoList from './components/ToDoList';

const App = () => {
  return (
    <div className='mx-auto max-w-3xl p-4'>
      <AddToDo />
      <FilterComponent />
      <ToDoList />
    </div>
  );
};

export default App;
