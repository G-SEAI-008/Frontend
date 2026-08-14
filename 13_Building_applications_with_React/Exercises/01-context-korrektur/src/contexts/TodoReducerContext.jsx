import { useEffect } from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';

const TodoReducerContext = createContext();

const initalState = {
  todos: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [],
  filter: 'all', // "all", "completed", "active"
};

// action = bspw. { type: 'ADD_TODO', payload: text }
const reduce = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo = {
        id: Date.now(), // id: crypto.randomUUID() Temporal.Now.instant()
        text: action.payload,
        completed: false,
      };
      const todos = [newTodo, ...state.todos];
      return { ...state, todos };
      //   return {
      //     ...state,
      //     todos: [
      //       {
      //         id: Date.now(),
      //         text: action.payload,
      //         completed: false,
      //       },
      //       ...state.todos,
      //     ],
      //   };
    }
    case 'FILTER_TODO': {
      const filter = action.payload; // "all", "completed", "active"
      return { ...state, filter };
      //   return { ...state, filter: action.payload };
    }
    case 'TOGGLE_TODO': {
      const todos = state.todos.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo,
      );
      return { ...state, todos };
    }
    case 'DELETE_TODO': {
      const todos = state.todos.filter((todo) => todo.id !== action.payload);
      return { ...state, todos };
    }
    default: {
      throw new Error(`Unkown action: ${action.type}`);
    }
  }
};

const TodoReducerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reduce, initalState);

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'FILTER_TODO', payload: filter });
  };

  const toggleTodo = (id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoReducerContext
      value={{
        todos: state.todos,
        filter: state.filter,
        addTodo,
        setFilter,
        toggleTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoReducerContext>
  );
};

export { TodoReducerContext };
export default TodoReducerProvider;
