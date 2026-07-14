// ============
// JAVASCRIPT
// ============

// ===========================
// 1. AUSGABE & KOMMENTARE
// ===========================

console.group("1. AUSGABE & KOMMENTARE");

// Python: print("Hello")
console.log("Hello World!");

// Einzeilige Kommentare in Python nutzen
/* 
   Mehrzeilige Kommentare in Python nutzen """
   JS nutzt Slash-Sternchen! 
*/

console.groupEnd();

// ==========================================
// 2. VARIABLEN & NAMENSKONVENTIONEN
// ==========================================

// Python: snake_case = "Bob"
// JS: Wir verwenden camelCase und MÜSSEN Variablen mit 'let' oder 'const' deklarieren

let studentName = "Bob"; // 'let' ist für Variablen, die sich ändern werden/können
studentName = "Alice"; // Neuzuweisung ist in Ordnung

const pi = 3.14159; // 'const' ist für Werte, die sich NIEMALS ändern
// pi = 3;                // FEHLER! Einer Konstante (const) kann kein neuer Wert zugewiesen werden

// ==========================================
// 3. DATENTYPEN & FORMATIERUNG
// ==========================================

console.group("3. DATENTYPEN & FORMATIERUNG");

// Python hat int und float. JS hat nur 'number'.

let age = 25; // number (Zahl)
let gpa = 3.85; // number (kein separater float-Typ)
let isSunny = true; // boolean (Beachte: kleingeschriebenes 'true', im Gegensatz zu Pythons 'True')

// Python: type(age)
console.log(typeof age); // Gibt aus: "number"

// Python f-strings: f"My name is {studentName}"
// JS Template-Literale: Verwende Backticks ` und ${}
let greeting = `My name is ${studentName} an I am ${age} years old.`;
console.log(greeting);

// Pythons 'None' teilt sich in JS in zwei Konzepte auf:
let emptyValue = null; // Absichtlich leer
let notAssigned; // undefined (Variable existiert, hat aber noch keinen Wert)

console.groupEnd();

// ==========================================
// 4. ARITHMETIK & MATHE-FALLEN
// ==========================================

console.group("4. ARITHMETIK");

// Grundlegende Mathematik funktioniert genau wie in Python (+, -, *, /, %, **)
let a = 10;
let b = 3;

console.log("Addition:", a + b); // 13
console.log("Exponentiation:", a ** b); // 1000 (Genauso wie in Python)

// FALLE 1: Ganzzahldivision (Floor Division)
// Python hat einen speziellen Operator für die Ganzzahldivision: 10 // 3 -> 3
// JS hat KEIN `//`. Du musst das Math-Objekt verwenden:
console.log("Normal Division:", a / b); // 3.3333333333333335
console.log("Floor Division:", Math.floor(a / b)); // 3 (Pythons a // b)

// FALLE 2: Inkrementieren & Dekrementieren
// Python: a += 1
// JS hat eine Kurzschreibweise speziell für das Addieren oder Subtrahieren von 1:
let count = 0;
count++; // JS-Kurzschreibweise für count += 1 oder count = count + 1
count--; // JS-Kurzschreibweise für count -= 1
console.log("Count after ++ and --:", count); // 0

// FALLE 3: Typumwandlung (Type Coercion) mit dem "+"-Operator
// In Python wirft "5" + 2 einen TypeError.
// In JS bevorzugt "+" die Zeichenkettenverkettung, aber andere Operatoren bevorzugen Mathematik!
console.log("String + Number:", "5" + 2); // "52" (In einen String umgewandelt)
console.log("String - Number:", "5" - 2); // 3    (In eine Zahl umgewandelt!)

console.groupEnd();

// ==========================================
// 5. GLEICHHEIT & VERGLEICH (DIE GROSSE FALLE)
// ==========================================

console.group("5. GLEICHHEIT & VERGLEICH");

// Verwende IMMER === in JavaScript!
// Pythons == verhält sich wie das === in JavaScript.

console.log(5 == "5"); // true  (JS versucht, den String in eine Zahl umzuwandeln. GEFÄHRLICH!)
console.log(5 === "5"); // false (Strikte Gleichheit: prüft Wert UND Typ. VERWENDE DIES!)
console.log(5 !== "5"); // true  (Strikte Ungleichheit. Python: !=)

console.groupEnd();

// ==========================================
// 6. LOGISCHE OPERATOREN
// ==========================================

console.group("6. LOGISCHE OPERATOREN");

// Python: and, or, not
// JS: &&, ||, !

let temperature = 25;
let isSummer = true;

// Python: if temperature > 20 and isSummer:
let goSwimming = temperature > 20 && isSummer;
let stayInside = temperature < 0 || !isSummer;

console.log("Go swimming:", goSwimming); // true
console.log("Stay inside:", stayInside); // false

console.groupEnd();

// ==========================================
// 7. BEDINGUNGEN & CODEBLÖCKE
// ==========================================

console.group("7. BEDINGUNGEN & CODEBLÖCKE");

// Python verwendet Doppelpunkte (:) und Einrückungen.
// JS verwendet Klammern () für Bedingungen und geschweifte Klammern {} für Blöcke.

let score = 1;

// If, Else, and Else If
// Python: elif
// JS: else if
if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else {
  console.log("Grade: C");
}

// Switch Statement
let day = 3;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  case 6:
  case 7:
    console.log("Weekend");
  default:
    console.log("Another day");
}

// Ternary Operator
let ageAgain = 10;
let isAdult = ageAgain >= 18 ? true : false;
console.log(isAdult);

console.groupEnd();

// ==========================================
// 8. SCHLEIFEN
// ==========================================

console.group("8. SCHLEIFEN");

// Python: for i in range(5):
// JS verwendet eine traditionelle dreiteilige Schleife: (Start; Bedingung; Schritt)
for (let i = 0; i < 5; i += 2) {
  console.log("For Schleife Iteration:", i);
}

// While-Schleifen prüfen die Bedingung, *bevor* der Code ausgeführt wird.
let counter = 0;
while (counter < 3) {
  console.log("While Schleife:", counter);
  counter++;
}

// Do-While-Schleifen führen den Code *mindestens einmal* aus, bevor die Bedingung am Ende geprüft wird.
let doCounter = 0;
do {
  console.log("Do-While Schleife:", doCounter);
  doCounter++;
} while (doCounter < 3);

console.groupEnd();

// ==========================================
// 9. FUNKTIONEN
// ==========================================

console.group("9. FUNKTIONEN");

// Python: def add(a, b): return a + b

// JS ES5 Syntax
// Funktionsdeklaration (Function Declaration)
function add(a, b) {
  return a + b;
}

// JS ES6 Syntax: Arrow-Funktionen (Ähnlich wie Pythons Lambda)
// Funktionsausdruck (Function Expression)
const multiply = (a, b) => {
  return a * b;
};

// Arrow-Funktion Kurzschreibweise (implizite Rückgabe)
const subtract = (a, b) => a - b;

console.log("Add:", add(5, 3));
console.log("Multiply:", multiply(5, 3));
console.log("Subtract:", subtract(5, 3));
