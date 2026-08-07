const ToDoItem = ({ todo, toggleTodo }) => {
  return (
    <li className='flex items-center mb-2'>
      <label>
        <input type='checkbox' checked={todo.completed} onChange={() => toggleTodo(todo.id)} className='mr-2' />
        <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
      </label>
    </li>
  );
};

export default ToDoItem;
