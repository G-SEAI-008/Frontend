const form = document.querySelector('form');
const todoContainer = document.querySelector('#todo-container');
// console.dir(todoContainer.children);

const createTodo = (todoText) => {
  const todo = document.createElement('li');
  todo.textContent = todoText;
  todoContainer.prepend(todo);
};

let todoArray = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // # DOM maipulation
  const inputValue = event.target['todo-input'].value;

  createTodo(inputValue);

  event.target['todo-input'].value = '';

  // # localStorage
  // const todos = ["todo1", "todo2"]

  if (localStorage.getItem('todos')) {
    const existingTodosJSON = localStorage.getItem('todos');
    const existingTodosJavaScript = JSON.parse(existingTodosJSON);
    todoArray = [...existingTodosJavaScript];
  }

  todoArray.push(inputValue);
  localStorage.setItem('todos', JSON.stringify(todoArray));
});

window.addEventListener('load', () => {
  if (!localStorage.getItem('todos')) return;

  // # localStorage
  const existingTodosJSON = localStorage.getItem('todos');
  const existingTodosJavaScript = JSON.parse(existingTodosJSON);
  // console.log(existingTodosJavaScript);

  existingTodosJavaScript.forEach((eachTodo) => {
    // # DOM manipulation
    createTodo(eachTodo);
  });
});
