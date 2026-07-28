// * Zentraler Schlüssel für die Taskdaten
const TASK_STORAGE_KEY = 'myTasks';
// const API_BASE_URL = 'https://example.com/api';

// # DOM-Elemente auswählen
const form = document.querySelector('form');
// const userInput = document.querySelector('#userInput');
const ul = document.querySelector('ul');
const reload = document.querySelector('#reload');

// # Funktionen
// * Daten aus dem Local Storage lesen
const getFromStorage = (key) => JSON.parse(localStorage.getItem(key)) ?? [];

// * Daten in den LocalStorage schreiben
const writeToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// ? Geplante Struktur
// <li id="task-345ndfgdfg...">
//    <p>Tasktext</p>
//    <button>Delete</button>
// </li>
// * Task element erzeugen im DOM
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

  //     // * Löschen
  //   deleteButton.addEventListener('click', () => {
  //   // * Gehört der Button zum richtigen Task?
  //     // * Welches <li> item?
  //     const itemToDelete = ul.querySelector(`#${newTask.id}`);
  //     // * Aktuellen Storage-Stand lesen
  //     const existingTasks = getFromStorage(TASK_STORAGE_KEY);
  //     // * Alle anderen Tasks behalten
  //     const updatedTasks = getFromStorage(TASK_STORAGE_KEY).filter((task) => task.id !== newTask.id);
  //     // * Gefilteres Array zurückschreiben
  //     writeToStorage(TASK_STORAGE_KEY, getFromStorage(TASK_STORAGE_KEY).filter((task) => task.id !== newTask.id););
  //     // * Passendes element aus dem DOM entfernen
  //     itemToDelete.remove();
  //   });

  // * Löschen
  deleteButton.addEventListener('click', () => {
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

// * Gespciherte Tasks in den DOM übertragen
const renderStorage = () => {
  const myTasks = getFromStorage(TASK_STORAGE_KEY);

  myTasks.forEach((task) => {
    const li = createListItem(task);
    ul.append(li);
  });
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  // const inputValue = userInput.value;
  const inputValue = event.target.userInput.value.trim();

  if (!inputValue) {
    return alert('Please enter something before submitting');
  }

  const newTask = {
    id: `task-${crypto.randomUUID().replaceAll('-', '')}`,
    content: inputValue,
  };

  // * Task im User Interface anzeigen
  const li = createListItem(newTask);
  ul.prepend(li);

  // # Read-Modify-Write Block
  // * 1. Bestehende Tasks lesen
  const myTasks = getFromStorage(TASK_STORAGE_KEY);

  // * 2. Neuen Task hinzufügen
  myTasks.unshift(newTask);

  // * 3. Aktuallisiertes Array speichern
  writeToStorage(TASK_STORAGE_KEY, myTasks);

  // * Formular nach erfolgreichem Submit leeren
  form.reset();
};

// # Event Listener
form.addEventListener('submit', handleFormSubmit);

// * Seite über den Reload-Button neu laden
reload.addEventListener('click', () => {
  globalThis.location.reload();
});

// window.addEventListener('load', renderStorage);
// window.addEventListener('DOMContentLoaded', renderStorage);
renderStorage();
