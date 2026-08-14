import { useState } from 'react';
import { createContext } from 'react';

const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState(() =>
    localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [],
  );
  const [filter, setFilter] = useState('all');

  const toggleTodo = (id) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const setFilterInView = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <TodoContext value={{ todos, setTodos, filter, toggleTodo, setFilterInView }}>
      {children}
    </TodoContext>
  );
};

export { TodoContext };

export default TodoContextProvider;
