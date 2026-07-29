import { TASK_STORAGE_KEY } from './config.js';
import { getFromStorage, writeToStorage } from './utils.js';
// ? Geplante Struktur
// <li id="task-345ndfgdfg...">
//    <p>Tasktext</p>
//    <button>Delete</button>
// </li>

// # DOM-Elemente auswählen
const form = document.querySelector('form');
// const userInput = document.querySelector('#userInput');
const ul = document.querySelector('ul');
const reload = document.querySelector('#reload');

// * Task Element erzeugen im DOM
const createListItem = (newTask) => {
  // * Listenelement
  const li = document.createElement('li');
  li.setAttribute('id', newTask.id);
  li.classList.add('flex', 'items-center', 'justify-between', 'w-full', 'my-2');
  // * Paragraph
  const paragraph = document.createElement('p');
  paragraph.textContent = newTask.content;
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add(
    'px-4',
    'py-2',
    'bg-red-500',
    'hover:bg-red-400',
    'text-white',
    'rounded',
    'cursor-pointer',
  );

  const someSpan = document.createElement('span');
  someSpan.textContent = ' 🤷';
  deleteButton.append(someSpan);

  // * Löschen
  deleteButton.addEventListener('click', (e) => {
    // console.log('Target', e.target);
    // console.log(e.target.closest('button'));

    // * Gehört der Button zum richtigen Task?
    // * Welches <li> item?
    const itemToDelete = ul.querySelector(`#${newTask.id}`);
    // * Gefilteres Array zurückschreiben
    writeToStorage(
      TASK_STORAGE_KEY,
      getFromStorage(TASK_STORAGE_KEY).filter((task) => task.id !== newTask.id),
    );
    // * Passendes Element aus dem DOM entfernen
    itemToDelete.remove();
  });

  li.append(paragraph, deleteButton);
  return li;
};

// * Gespeicherte Tasks in den DOM übertragen
const renderStorage = () => {
  const myTasks = getFromStorage(TASK_STORAGE_KEY);

  myTasks.forEach((task) => {
    const li = createListItem(task);
    ul.append(li);
  });
};

export { createListItem, renderStorage, ul, form, reload };
