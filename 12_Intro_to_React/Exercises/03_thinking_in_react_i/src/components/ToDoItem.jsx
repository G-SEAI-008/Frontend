const ToDoItem = ({ todo }) => {
  return (
    <li className='mb-2 flex items-center'>
      <label>
        <input type='checkbox' defaultChecked={todo.completed} className='mr-2' />
        {todo.text}
      </label>
    </li>
  );
};

export default ToDoItem;
