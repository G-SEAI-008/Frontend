import AddToDo from './components/AddToDo';
import FilterComponent from './components/FilterComponent';
import ToDoList from './components/ToDoList';

const App = () => {
  const todos = [
    {
      id: 1,
      text: 'Learn React',
      completed: false,
    },
    {
      id: 2,
      text: 'Learn Tailwind CSS',
      completed: true,
    },
    {
      id: 3,
      text: 'Learn Node.js',
      completed: false,
    },
    {
      id: 4,
      text: 'Learn Express.js',
      completed: false,
    },
  ];

  return (
    <div className='mx-auto max-w-3xl p-4'>
      <AddToDo />
      <FilterComponent />
      <ToDoList todos={todos} />
    </div>
  );
};

export default App;
