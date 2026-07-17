// =============================================
// 0. VORAUSSETZUNG: FIRST-CLASS CITIZENS
// =============================================
console.group("0. VORAUSSETZUNG: FIRST-CLASS CITIZENS");
// In JavaScript (wie auch in Python) sind Funktionen sogenannte "First-Class Citizens" (Bürger erster Klasse).
// Das bedeutet: Funktionen sind unter der Haube eigentlich nichts anderes als "normale" Werte – genau wie Strings, Zahlen oder Arrays!

// Weil sie ganz normale Werte sind, können wir mit ihnen alles machen, was wir auch mit anderen Werten tun:
// 1. Sie in Variablen speichern: const myFunc = () => {}
// 2. Sie als Argumente (Parameter) an andere Funktionen übergeben.
// 3. Sie als Ergebnis (return) aus anderen Funktionen zurückgeben.

// Diese "First-Class"-Eigenschaft ist die zwingende Voraussetzung dafür,
// dass Higher Order Functions in einer Programmiersprache überhaupt existieren können.

console.groupEnd();

// =============================================
// 1. HIGHER ORDER FUNCTIONS ALS FUNKTIONS-KONSUMENTEN
// =============================================
console.group("1. HIGHER ORDER FUNCTIONS ALS FUNKTIONS-KONSUMENTEN");
// Higher Order Functions (Funktionen höherer Ordnung) können eine oder mehrere Funktionen als Argumente entgegennehmen.

function sayHi() {
  return "Hi, ";
}

const sayWelcome = () => "Welcome, ";
const sayGoodbye = () => "Goodbye, ";

const personalMessage = (message, name) => {
  console.log(message() + name);
};

// PYTHON-VERGLEICH: Da Python und JS Funktionen als Werte behandeln, übergeben wir hier
// nur den NAMEN der Funktion (z.B. 'sayWelcome') OHNE die Klammern '()'.
// WARUM OHNE KLAMMERN?
// - sayWelcome() MIT Klammern führt die Funktion SOFORT an dieser Stelle aus. Es würde nur das Ergebnis (der String "Welcome, ") übergeben werden.
// - sayWelcome OHNE Klammern übergibt die Funktion SELBST als Bauplan. So überlassen wir der 'personalMessage'-Funktion die Kontrolle darüber, WANN sie ausgeführt wird.

personalMessage(sayWelcome, "John Doe!");
personalMessage(sayGoodbye, "John Doe!");
personalMessage(sayHi, "John Doe!");

console.groupEnd();

// =============================================
// 2. HIGHER ORDER FUNCTIONS ALS FUNKTIONS-FABRIKEN
// =============================================
console.group("2. HIGHER ORDER FUNCTIONS ALS FUNKTIONS-FABRIKEN");
// Higher Order Functions können als Ergebnis eine andere Funktion zurückgeben.

// PYTHON-VERGLEICH: In Python machst du das, indem du ein verschachteltes 'def' innerhalb
// einer Funktion definierst und zurückgibst, oder indem du eine 'lambda'-Funktion zurückgibst.

const sayHello = (name) => {
  return () => {
    console.log(`Hallo, ${name}!`);
  };
};

const helloJohn = sayHello("John");
const helloAlice = sayHello("Alice");
helloJohn();
helloAlice();

// Eine Funktion, die:
// - eine andere Funktion als Argument entgegennimmt, ODER
// - eine Funktion zurückgibt,
// nennt man eine Higher Order Function.

console.groupEnd();

// =============================================
// 3. HIGHER ORDER ARRAY METHODEN
// =============================================
console.group("3. HIGHER ORDER ARRAY METHODEN");

// 1. forEach - Führt eine übergebene Funktion einmal für jedes Array-Element aus
// PYTHON-VERGLEICH: Python hat hierfür kein direktes Äquivalent;
// man würde einfach eine Standard `for item in iterable:` Schleife nutzen.
console.log("forEach Beispiel:");

const fruits = ["apple", "banana", "cherry"];

fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});

// 2. map - Erstellt ein neues Array mit den Ergebnissen des Funktionsaufrufs für jedes Array-Element
// PYTHON-VERGLEICH: Python hat map(func, iterable), aber meistens würde
// man eine List Comprehension nutzen: [number * 2 for number in numbers]
console.log("map Beispiel:");

const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((number) => number * 2);

console.log(doubled);
console.log(numbers);

// 3. find - Gibt das erste Element im Array zurück, das die übergebene Funktion (Bedingung) erfüllt
// PYTHON-VERGLEICH: Pythons Äquivalent mit Generatoren ist etwas sperrig:
// next((person for person in people if person['age'] == 30), None)
console.log("find Beispiel:");

const people = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
  { name: "Jim", age: 35 },
];

const person30 = people.find((person) => person.age === 30);
console.log(person30);

// 4. filter - Erstellt ein neues Array mit allen Elementen, die den Test der übergebenen Funktion bestehen
// PYTHON-VERGLEICH: Python hat filter(func, iterable) oder List Comprehensions:
// [word for word in words if len(word) > 6]
console.log("filter Beispiel:");

const words = ["random", "words", "balcony", "dog", "bootcamp"];

const longWords = words.filter((word) => word.length > 6);
console.log(longWords);
console.log(words);

// 5. reduce - Führt eine Reducer-Funktion für jedes Element aus und gibt einen einzigen Wert zurück
// PYTHON-VERGLEICH: Genaues Äquivalent zu Pythons `functools.reduce(func, iterable, initializer)`
console.log("reduce Beispiel:");

const numbers2 = [1, 2, 3, 4, 5];

const sum = numbers2.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
);

console.log(sum);

// 6. some - Prüft, ob mindestens ein Element im Array den Test besteht
// PYTHON-VERGLEICH: Funktioniert exakt wie Pythons `any(len(word) > 6 for word in words)`
console.log("some Beispiel:");

const words2 = ["random", "words", "balcony", "dog", "bootcamp"];

const hasLongWord = words2.some((word) => word.length > 6);
console.log(hasLongWord);

// 7. every - Prüft, ob alle Elemente im Array den Test bestehen
// PYTHON-VERGLEICH: Funktioniert exakt wie Pythons `all(len(word) > 6 for word in words)`
console.log("every Beispiel:");
const words3 = ["random", "words", "balcony", "dog", "bootcamp"];

const allLongWords = words3.every((word) => word.length > 6);
console.log(allLongWords);

// All diese Methoden sind Higher Order Functions, weil sie eine Funktion als Argument entgegennehmen.
// Die Funktionen, die ihnen übergeben werden, nennt man Callback-Funktionen.

// =============================================
// 4. BEISPIEL: EIGENE FILTER-FUNKTION BAUEN
// =============================================

// Vorbereitetes Array mit Zahlen
// const numbers = [1, 2, 3, 4, 5];

// Beispiel für eine benutzerdefinierte Filter-Funktion, die dasselbe tut wie die Array-Methode 'filter':
// PYTHON-VERGLEICH: Beachte, wie 'testFn' genau wie eine normale Funktion innerhalb der if-Anweisung aufgerufen wird.
const filterNumbers = (array, testFn) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (testFn(array[i])) {
      result.push(array[i]);
    }
  }
  return result;
};

const isEven = (number) => number % 2 === 0;

// Die Filter-Funktion auf das vorbereitete Array anwenden:
console.log("\nEigener Filter + filter() Array-Methode im Vergleich:");
console.log(filterNumbers(numbers, isEven));

// Zum Vergleich: Verwende die eingebaute Array-Methode 'filter', um gerade Zahlen zu filtern:
const evenNumbers = numbers.filter((number) => number % 2 === 0);

// Diese Funktion gibt true für gerade Zahlen zurück (also Zahlen, die durch 2 teilbar sind),
// was bedeutet, dass nur gerade Zahlen in das neue Array aufgenommen werden.

// Ergebnis: Das evenNumbers Array enthält nur die geraden Zahlen aus dem ursprünglichen numbers Array
// und erreicht somit genau dasselbe Ergebnis wie unsere benutzerdefinierte Funktion.

console.log(evenNumbers);
// Erwartete Ausgabe: [ 2, 4 ]

// =============================================
// 5. CALLBACK-FUNKTIONEN
// =============================================
// Eine Callback-Funktion ist eine Funktion, die als Argument an eine andere Funktion übergeben wird.
// Sie wird dann innerhalb der äußeren Funktion aufgerufen, um eine bestimmte Routine oder Aktion abzuschließen. - MDN

// PYTHON-VERGLEICH: In JavaScript verwenden wir für Callbacks fast immer Arrow-Funktionen (Pfeilfunktionen).
// Eine Arrow-Funktion `(number) => number % 2 === 0` ist das exakte Äquivalent
// zu einer Python Lambda-Funktion: `lambda number: number % 2 == 0`.

// Im obigen Beispiel: Die Arrow-Funktion `number => number % 2 === 0` wird als Argument an .filter() übergeben.
