/**
 * JAVASCRIPT OBJEKTE (Pythons "Dictionaries")
 * ===========================================
 *
 * In JavaScript sind Objekte im Grunde das, was Dictionaries in Python sind:
 * Sammlungen von Schlüssel-Wert-Paaren (Key-Value-Pairs).
 *
 * Hauptunterschiede zu Python:
 * 1. Schlüssel (Keys) brauchen keine Anführungszeichen, wenn sie gültige Namen sind.
 * 2. Man greift meistens mit einem Punkt (.) auf Werte zu, nicht mit eckigen Klammern.
 * 3. Objekte können Methoden (Funktionen) enthalten. JS nutzt 'this' anstelle von Pythons 'self'.
 */

// ==========================================
// ABSCHNITT 1: OBJEKT-LITERALE
// ==========================================
console.group("ABSCHNITT 1: OBJEKT-LITERALE");

// Ein Objekt erstellen (Vergleiche mit: user = {"firstName": "John", ...})
const user = {
  firstName: "John",
  lastName: "Doe",
  age: 20,
  hobbies: ["football", "gaming", "sleeping"],
  sayHi() {
    // Methode (Funktion innerhalb eines Objekts)
    // PYTHON-VERGLEICH: In Python verwendest du 'self.firstName', in JS 'this.firstName'
    return `Hello, my name is ${this.firstName}, I'm ${this.age} years old!`;
  },
};

console.groupEnd();

// ==========================================
// ABSCHNITT 2: AUF OBJEKT-EIGENSCHAFTEN ZUGREIFEN
// ==========================================
console.group("ABSCHNITT 2: AUF OBJEKT-EIGENSCHAFTEN ZUGREIFEN");
/*
  Es gibt zwei Wege, auf Eigenschaften zuzugreifen:
  1. Punkt-Notation (Dot notation): object.property (DER JS-STANDARD)
  2. Klammer-Notation (Bracket notation): object["property"] (DER PYTHON-WEG)
  
  Wann nutzt man die Klammer-Notation in JS?
  - Wenn der Eigenschaftsname Leerzeichen oder Sonderzeichen enthält.
  - Wenn der Eigenschaftsname in einer Variablen gespeichert ist.
*/

console.log("Ganzes Objekt:", user);
// PYTHON-FALLE: In Python schreibst du user["firstName"]. In JS ist user.firstName üblich!
console.log("Punkt-Notation:", user.firstName);
console.log("Klammer-Notation:", user["age"]);
console.log("Hobby:", user.hobbies[0]);

// Variablen in der Klammer-Notation verwenden
const selectedValue = "firstName";
console.log("Gewählter Wert:", selectedValue); // Zeigt "firstName"
console.log("Zugriff über Variable:", user[selectedValue]); // Zeigt "John"

console.groupEnd();

// ==========================================
// ABSCHNITT 3: OBJEKTE VERÄNDERN
// ==========================================
console.group("ABSCHNITT 3: OBJEKTE VERÄNDERN");
/*
  Objekte sind mutierbar (veränderbar) - wir können:
  - Vorhandene Werte ändern
  - Neue Eigenschaften hinzufügen
  - Eigenschaften löschen
*/

user.age = 30; // Vorhandene Eigenschaft ändern
user.job = "Web Developer"; // Neue Eigenschaft hinzufügen (Python: user["job"] = "...")

// Eigenschaft löschen (Python: del user["job"])
// delete user.job;

console.log("Verändertes Objekt:", user);

// Eine Objekt-Methode aufrufen
console.log(user.sayHi());

console.groupEnd();

// ==========================================
// ABSCHNITT 4: OBJEKT-DESTRUKTURIERUNG (Destructuring)
// ==========================================
console.group("ABSCHNITT 4: OBJEKT-DESTRUKTURIERUNG (Destructuring)");
/*
  Destrukturierung ist ein sehr wichtiges JS-Konzept ohne direktes Python-Äquivalent.
  Es erlaubt uns, mehrere Eigenschaften aus einem Objekt "herauszuziehen" und in 
  einzelnen Variablen zu speichern - und das in nur einer Zeile.
*/

// Einfache Destrukturierung
// Anstatt: const firstName = user.firstName; const age = user.age;
const { firstName, age: year } = user;
console.log("Destrukturiert:", firstName, year);

// Destrukturierung in Funktionsparametern
function greet({ firstName, age }) {
  console.log(`Hello, my name is ${firstName} and I am ${age} years old.`);
}

// Wir übergeben das GANZE Objekt, aber die Funktion "zieht" sich nur firstName und age heraus.
greet(user);

console.groupEnd();
