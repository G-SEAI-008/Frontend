// ==========================================
// Aufgabe 1: forEach
// ==========================================
console.group("Aufgabe 1: forEach");

// 1. Initialisiere ein Array mit Zahlen:
const numbers = [1, 2, 3, 4, 5];

// 2. Verwende die forEach-Methode, um jede Zahl auszugeben:
numbers.forEach((number) => console.log("Number:", number));

// 3. Verwende die forEach-Methode, um die Summe der Zahlen zu berechnen:
let sum = 0;

numbers.forEach((number) => (sum += number));

console.log("\nSum:", sum);

// 4. Verwende die forEach-Methode, um ein neues Array mit quadrierten Werten zu erstellen:
const squaredNumbers = [];

numbers.forEach((number) => squaredNumbers.push(number * number));

console.log("\nSquared Numbers:", squaredNumbers);

console.groupEnd();

// ==========================================
// Aufgabe 2: map
// ==========================================
console.group("Aufgabe 2: map");

// 1. Initialisiere ein Array mit Zahlen:
const numbers2 = [1, 2, 3, 4, 5];

// 2. Verwende die map-Methode, um ein neues Array mit verdoppelten Werten zu erstellen:
const doubledNumbers = numbers2.map((number) => number * 2);

console.log("\nDoubled Numbers: ", doubledNumbers);

// 3. Verwende die map-Methode, um ein neues Array aus Strings zu erstellen:
const stringNumbers = numbers2.map((number) => `Number: ${number}`);

console.log("\nString Numbers: ", stringNumbers);

// 4. Verwende die map-Methode, um ein neues Array aus Objekten zu erstellen:
const numberObjects = numbers2.map((number) => ({
  original: number,
  squared: number * number,
}));

console.log("\nNumber Objects: ", numberObjects);

console.groupEnd();

// ==========================================
// Aufgabe 3: find
// ==========================================
console.group("Aufgabe 3: find");

// 1. Initialisiere ein Array mit Zahlen:
const numbers3 = [10, 20, 30, 40, 50];

// 2. Verwende die find-Methode, um eine Zahl größer als 25 zu finden:
const foundNumber = numbers3.find((number) => number > 25);

console.log("\nFound Number: ", foundNumber);

// 3. Initialisiere ein Array mit Objekten:
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
  { name: "David", age: 40 },
];

// 4. Verwende die find-Methode, um eine Person namens "Charlie" zu finden:
const findCharlie = people.find((person) => person.name === "Charlie");

console.log("\nCharlie: ", findCharlie);

console.groupEnd();

// ==========================================
// Aufgabe 4: filter
// ==========================================
console.group("Aufgabe 4: filter");

// 1. Initialisiere ein Array mit Zahlen:
const numbers4 = [5, 10, 15, 20, 25, 30];

// 2. Verwende die filter-Methode, um ein neues Array mit Zahlen größer als 15 zu erstellen:
const numbersGreaterThan15 = numbers4.filter((number) => number > 15);

console.log("\nNumbers Greater Than 15: ", numbersGreaterThan15);

// 3. Initialisiere ein Array mit Objekten:
const students = [
  { name: "Alice", grade: 85 },
  { name: "Bob", grade: 92 },
  { name: "Charlie", grade: 78 },
  { name: "David", grade: 88 },
  { name: "Eve", grade: 95 },
];

// 4. Verwende die filter-Methode, um ein neues Array mit Schülern zu erstellen, die mehr als 80 Punkte haben:
const studentsAbove80 = students.filter((student) => student.grade > 80);

console.log("\nStudents Above 80: ", studentsAbove80);

console.groupEnd();

// ==========================================
// Aufgabe 5: some und every
// ==========================================
console.group("Aufgabe 5: some und every");

// 1. Initialisiere ein Array mit Zahlen:
const numbers5 = [4, 8, 15, 16, 23, 42];

// 2. Verwende die some-Methode, um zu prüfen, ob es Zahlen größer als 20 gibt:
const isAnyGreaterThan20 = numbers5.some((number) => number > 20);

console.log("\nIs Any Greater Than 20: ", isAnyGreaterThan20);

// 3. Verwende die every-Methode, um zu prüfen, ob alle Zahlen kleiner als 50 sind:
const allNumbersLessThan50 = numbers5.every((number) => number < 50);

console.log("\nAll Numbers Less Than 50: ", allNumbersLessThan50);

// 4. Initialisiere ein Array mit Objekten:
const students2 = [
  { name: "Alice", age: 25, passed: true },
  { name: "Bob", age: 22, passed: false },
  { name: "Charlie", age: 27, passed: true },
  { name: "David", age: 20, passed: true },
];

// 5. Verwende die some-Methode, um zu prüfen, ob ein Schüler durchgefallen ist:
const ifAnyFailed = students2.some((student) => !student.passed);

// Alternative:
// const ifAnyFailed = students2.some((student) => student.passed === false);

console.log("\nIf Any Failed: ", ifAnyFailed);

// 6. Verwende die every-Methode, um zu prüfen, ob alle Schüler älter als 18 sind:
const ifAllOlderThan18 = students2.every((student) => student.age > 18);

console.log("\nIf All Older Than 18: ", ifAllOlderThan18);

console.groupEnd();
