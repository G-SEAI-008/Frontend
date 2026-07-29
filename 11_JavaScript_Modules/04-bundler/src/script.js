import { TASK_STORAGE_KEY } from './config.js';
import { createListItem, form, reload, renderStorage, ul } from './ui.js';
import { writeToStorage, getFromStorage } from './utils.js';

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

  // * 3. Aktualisiertes Array speichern
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
