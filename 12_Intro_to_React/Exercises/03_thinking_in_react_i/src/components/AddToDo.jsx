const AddToDo = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.todo.value;
    if (!value) return;
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit} className='mb-4 flex'>
      <input
        type='text'
        name='todo'
        placeholder='Add a new to-do'
        className='mr-2 flex-1 rounded border px-2 py-1'
      />
      <button type='submit' className='rounded bg-blue-500 px-4 py-2 text-white'>
        Add
      </button>
    </form>
  );
};

export default AddToDo;
