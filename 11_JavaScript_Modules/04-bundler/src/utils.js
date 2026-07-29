// # Funktionen
// * Daten aus dem Local Storage lesen
const getFromStorage = (key) => JSON.parse(localStorage.getItem(key)) ?? [];

// * Daten in den LocalStorage schreiben
const writeToStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export { getFromStorage, writeToStorage };
