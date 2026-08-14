// todo = {id: Date.now(), text: "Katzen füttern", completed: false}

import { use } from 'react';

import { TodoReducerContext } from '../contexts/TodoReducerContext';

const ToDoItem = ({ todo }) => {
  // const { toggleTodo } = use(TodoContext);

  const { toggleTodo, deleteTodo } = use(TodoReducerContext);

  return (
    <li className='mb-2 flex items-center'>
      <label>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className='mr-2 cursor-pointer'
        />
        <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
      </label>
      <button
        className='ml-2 cursor-pointer rounded px-2 py-1 text-sm hover:bg-red-300'
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </li>
  );
};

export default ToDoItem;
