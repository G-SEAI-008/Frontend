import { use } from 'react';
import { useState } from 'react';

import { TodoContext } from '../contexts/TodoContex';
import { TodoReducerContext } from '../contexts/TodoReducerContext';

const AddToDo = () => {
  const [newTodo, setNewTodo] = useState('');
  // const { setTodos } = use(TodoContext);
  const { addTodo } = use(TodoReducerContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      return alert('Please enter a to-do item');
    }

    addTodo(newTodo);

    // setTodos((prevTodos) => {
    //   // {id: 34254576567856, text: "Katzen füttern", completed: false}
    //   const updatedTodos = [{ id: Date.now(), text: newTodo, completed: false }, ...prevTodos];
    //   localStorage.setItem('todos', JSON.stringify(updatedTodos));
    //   return updatedTodos;
    // });
    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className='mb-4 flex'>
      <input
        type='text'
        name='todo'
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder='Add a new to-do'
        className='mr-2 flex-1 rounded border px-2 py-1'
      />
      <button type='submit' className='cursor-pointer rounded bg-blue-500 px-4 py-2 text-white'>
        Add
      </button>
    </form>
  );
};

export default AddToDo;
