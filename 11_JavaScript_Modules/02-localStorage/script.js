// # localStorage lesen
const userName = localStorage.getItem('name');
console.log(userName);

const email = localStorage.getItem('email');
console.log(email);

const age = localStorage.getItem('age');
console.log(age);

// # localStorage schreiben
localStorage.setItem('isStudent', false);
localStorage.setItem('name', 'Renke');

// # entfernen
// localStorage.removeItem('name');

// # Alle items löschen
// localStorage.clear();

// # Item ändern
localStorage.setItem('name', 'Pavel');
