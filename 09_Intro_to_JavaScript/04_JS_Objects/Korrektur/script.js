// ==========================================
// OBJEKT-LITERALE (OBJECT LITERALS)
// ==========================================
console.group("OBJEKT-LITERALE (OBJECT LITERALS)");

// 1. Erstelle ein Objekt namens 'book' mit der Objekt-Literal-Syntax.

// 2. Das 'book'-Objekt soll folgende Eigenschaften haben:
// title: ein String (Titel des Buches).
// author: ein String (Autor des Buches).
// pages: eine Number (Gesamtzahl der Seiten).
// isRead: ein Boolean (zeigt an, ob das Buch gelesen wurde).

// 3. Füge dem 'book'-Objekt eine Methode namens 'summary' hinzu.
// Diese Methode soll einen String zurückgeben, der die Buchdetails in diesem Format zusammenfasst:
// "Title: [title], Author: [author], Pages: [pages], Read: [Yes/No]".

const book = {
  title: "The Two Towers",
  author: "J.R.R. Tolkien",
  pages: 352,
  isRead: true,
  summary() {
    return `Title: ${this.title}, Author: ${this.author}, Pages: ${
      this.pages
    }, Read: ${this.isRead ? "Yes" : "No"}`;
  },
};

console.log(book.summary());

console.groupEnd();

// ==========================================
// DESTRUKTURIERUNG (DESTRUCTURING)
// ==========================================
console.group("DESTRUKTURIERUNG (DESTRUCTURING)");

// Ausgangs-Array
const fruits = ["apple", "banana", "cherry", "date"];

// Aufgabe 1: Einfache Array-Destrukturierung
const [fruit1, fruit2] = fruits;
console.log(fruit1);
console.log(fruit2);

// Aufgabe 2: Elemente bei der Array-Destrukturierung überspringen
// const [fruit1, , fruit3] = fruits;
// console.log(fruit1);
// console.log(fruit3);

// ------------------------------------------------

// Ausgangs-Objekt
const person = {
  name: "John Doe",
  age: 30,
  address: {
    city: "New York",
    zip: "10001",
  },
};

// Aufgabe 3: Einfache Objekt-Destrukturierung
const { name, age } = person;
console.log(name);
console.log(age);

// Aufgabe 4: Verschachtelte Objekt-Destrukturierung (Nested Destructuring)
const {
  address: { city },
} = person;

// Alternativer Ansatz zur verschachtelten Destrukturierung:
// const { city } = person.address;

console.log(city);

// ------------------------------------------------

// Ausgangs-Funktion
// function displayPerson(person) {
//     console.log(`Name: ${person.name}, Age: ${person.age}`);
// }

// Aufgabe 5: Destrukturierung in Funktionsparametern
function displayPerson({ name, age }) {
  console.log(`Name: ${name}, Age: ${age}`);
}

displayPerson(person);

console.groupEnd();
