const ToDoItem = ({ todo, toggleTodo }) => {
  return (
    <li className='mb-2 flex items-center'>
      <label>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className='mr-2'
        />
        {todo.text}
      </label>
    </li>
  );
};

export default ToDoItem;
