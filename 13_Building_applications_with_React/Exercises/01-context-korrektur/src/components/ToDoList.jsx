import { use } from 'react';

import { TodoReducerContext } from '../contexts/TodoReducerContext';
import ToDoItem from './ToDoItem';

const ToDoList = () => {
  // const { filter, todos } = use(TodoContext);
  const { todos, filter } = use(TodoReducerContext);

  // {id: Date.now(), text: "Katzen füttern", completed: false}
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') {
      return true;
    }
    if (filter === 'completed' && todo.completed) {
      return true;
    }
    if (filter === 'active' && !todo.completed) {
      return true;
    }
    return false;
  });

  return (
    <ul>
      {filteredTodos.map((filteredTodoObject) => (
        <ToDoItem key={filteredTodoObject.id} todo={filteredTodoObject} />
      ))}
    </ul>
  );
};

export default ToDoList;
