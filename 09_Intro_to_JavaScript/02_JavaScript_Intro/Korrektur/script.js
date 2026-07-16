// ==========================================
// ABSCHNITT 1: VARIABLEN
// ==========================================
console.group("ABSCHNITT 1: VARIABLEN");
/* 
  In JavaScript verwenden wir Variablen, um Daten zu speichern, die wir später nutzen können.
  Es gibt drei Möglichkeiten, Variablen zu deklarieren:
  - let: für Werte, die sich ändern können
  - const: für Werte, die sich nicht ändern werden (Konstanten)
  - var: der ältere Weg (versuche, dies zu vermeiden)
*/

// 1. Variablen mit let und const deklarieren:
let age = 25; // Typ Number (Zahl)
const birthYear = 1999; // Typ Number (Konstante)
let name = "John Doe"; // Typ String (Zeichenkette)
const isStudent = true; // Typ Boolean (wahr/falsch)

// 2. Werte neu zuweisen:
// Wir können 'let'-Variablen ändern, aber keine 'const'-Variablen
age = 26; // Das funktioniert problemlos
name = "Jane Doe"; // Das funktioniert problemlos
// birthYear = 2000       // Das verursacht einen Fehler - eine Konstante (const) kann nicht geändert werden!
// isStudent = false;     // Das verursacht einen Fehler - eine Konstante (const) kann nicht geändert werden!

// 3. Variablen ausgeben, um ihre Werte zu sehen
console.log(age); // Zeigt 26
console.log(birthYear); // Zeigt 1999
console.log(name); // Zeigt "Jane Doe"
console.log(isStudent); // Zeigt true

// 4. Variablen erstellen und verändern
let favoriteColor = "blue";
console.log(favoriteColor); // Zeigt "blue"
favoriteColor = "green"; // Wir können es ändern, weil es 'let' ist
console.log(favoriteColor); // Zeigt jetzt "green"

console.groupEnd();

// ==========================================
// AUFGABE 2: ARITHMETIK
// ==========================================
console.group("AUFGABE 2: ARITHMETIK");
/* 
  JavaScript kann mathematische Operationen ausführen wie:
  +  (Addition)
  -  (Subtraktion)
  *  (Multiplikation)
  /  (Division)
  %  (Modulo / Restwert)
  
  Sei vorsichtig beim Mischen von Zahlen und Strings!
*/

// 1. Addition mit gemischten Typen
let num = 5;
let strNum = "3";
let additionResult = num + strNum;
console.log("Addition Result:", additionResult);

// 2. Subtraktion mit gemischten Typen
let subtractionResult = num - strNum;
console.log("Subtraction Result:", subtractionResult);

// 3. Multiplikation mit einem String
let multiplicationResult = strNum * 2;
console.log("Multiplication Result:", multiplicationResult);

// 4. Division durch einen String
let divisionResult = 10 / strNum;
console.log("Division Result:", divisionResult);

// 5. Modulo-Operation
let num2 = 10;
let modulusResult = num2 % num;
console.log("Modulus Result with Numbers:", modulusResult);
modulusResult = num2 % strNum;
console.log("Modulus Result with String:", modulusResult);

// 6. Numerische Operationen
let a = 8;
let b = 3;
let c = 10;

// Addition von Zahlen
let sum = a + b + c;
console.log("Addition of Numbers:", sum);

// Subtraktion von Zahlen
let difference = a - b - c;
console.log("Subtraction of Numbers:", difference);

// Multiplikation von Zahlen
let product = a * b * c;
console.log("Multiplication of Numbers:", product);

// Division von Zahlen
let quotient = c / a;
console.log("Division of Numbers:", quotient);

// Modulo von Zahlen
let remainder = c % a;
console.log("Modulus of Numbers:", remainder);

console.groupEnd();

// ==========================================
// AUFGABE 3: VERGLEICHE
// ==========================================
console.group("AUFGABE 3: VERGLEICHE");
/* 
  Wir können Werte vergleichen mit:
  ==  (einfache Gleichheit - vergleicht nur den Wert)
  === (strikte Gleichheit - vergleicht Wert UND Typ)
  >   (größer als)
  <   (kleiner als)
  >=  (größer oder gleich)
  <=  (kleiner oder gleich)
*/

// Strikte vs. Einfache Gleichheit und Ungleichheit
console.log('5 == "5": ', 5 == "5"); // Einfache Gleichheit, true
console.log('5 === "5": ', 5 === "5"); // Strikte Gleichheit, false

console.log('10 != "10": ', 10 != "10"); // Einfache Ungleichheit, false
console.log('10 !== "10": ', 10 !== "10"); // Strikte Ungleichheit, true

// Größer als, Kleiner als, Größer oder gleich, Kleiner oder gleich
console.log("5 > 3: ", 5 > 3); // true
console.log('"5" > "3": ', "5" > "3"); // true, String-Vergleich

console.log("10 < 20: ", 10 < 20); // true
console.log('"10" < "20": ', "10" < "20"); // true, String-Vergleich

console.log("5 >= 5: ", 5 >= 5); // true
console.log('"5" >= 5: ', "5" >= 5); // true, Typumwandlung von String zu Zahl

console.log("10 <= 20: ", 10 <= 20); // true
console.log('"10" <= "20": ', "10" <= "20"); // true, String-Vergleich

// Zusätzliche Vergleiche zur Veranschaulichung verschiedener Ergebnisse
console.log('true == "true": ', true == "true"); // false, unterschiedliche Typen und Werte
console.log("false === false: ", false === false); // true, gleicher Typ und Wert
console.log("0 == false: ", 0 == false); // true, Typumwandlung macht sie gleichwertig
console.log("0 === false: ", 0 === false); // false, keine Typumwandlung und unterschiedliche Typen

console.groupEnd();

// ==========================================
// AUFGABE 4: BEDINGUNGEN (CONDITIONALS)
// ==========================================
console.group("AUFGABE 4: BEDINGUNGEN (CONDITIONALS)");
/* 
  Bedingungen lassen uns Entscheidungen in unserem Code treffen.
  Wir können verschiedenen Code basierend auf verschiedenen Bedingungen ausführen.
  - if/else-Anweisungen für einfache Bedingungen
  - switch-Anweisungen für mehrere spezifische Fälle
*/

// Aktuelle Temperatur in Grad Celsius
const temperature = 15;

// Aufgabe 1: Einfaches if/else
if (temperature < 5) {
  console.log("It's cold, wear a coat.");
} else {
  console.log("It's not too cold, no coat needed.");
}

// Aufgabe 2: if/else else/if verwenden
if (temperature < 5) {
  console.log("It's cold, wear a coat.");
} else if (temperature <= 15) {
  console.log("It's mild, wear a sweater.");
} else {
  console.log("It's warm, wear a t-shirt.");
}

// Aufgabe 3: switch verwenden
switch (true) {
  case temperature === 5:
    console.log("It's very cold, definitely wear a coat.");
    break;
  case temperature === 15:
    console.log("Nice and comfortable, a sweater will do.");
    break;
  case temperature === 20:
    console.log("Quite warm, a t-shirt is perfect.");
    break;
  default:
    console.log("Enter a specific temperature like 5, 15, or 20 degrees.");
}

console.groupEnd();

// ==========================================
// AUFGABE 5: SCHLEIFEN (LOOPS)
// ==========================================
console.group("AUFGABE 5: SCHLEIFEN (LOOPS)");
/* 
  Schleifen helfen uns, dasselbe mehrmals zu tun.
  Verschiedene Arten von Schleifen:
  - for-Schleife (wenn du weißt, wie oft sie durchlaufen werden soll)
  - while-Schleife (wenn du nicht weißt, wie oft)
  - do-while-Schleife (wird immer mindestens einmal ausgeführt)
*/

const animals = ["lion", "tiger", "bear", "giraffe", "zebra", "monkey"];

// For-Schleife - Die häufigste Art von Schleife
let totalAnimals = 0;
for (let i = 0; i < animals.length; i++) {
  totalAnimals++;
}
console.log(`There are ${totalAnimals} animals in the zoo.`);

// While-Schleife - Läuft weiter, solange die Bedingung wahr ist
let animals5LettersOrMore = 0;
let i = 0;
while (i < animals.length) {
  if (animals[i].length >= 5) {
    animals5LettersOrMore++;
  }
  i++;
}
console.log(
  `There are ${animals5LettersOrMore} animals with 5 or more letters`,
);

// Do-While-Schleife - Wird immer mindestens einmal ausgeführt
let count = 0;
do {
  if (animals[count].startsWith("m")) {
    break;
  }
  count++;
} while (count < animals.length);
console.log(`Count until m: ${count}`);

console.groupEnd();

// ==========================================
// AUFGABEN 6: FUNKTIONEN
// ==========================================
console.group("AUFGABEN 6: FUNKTIONEN");
/* 
  Funktionen sind wiederverwendbare Codeblöcke.
  Wir können Code einmal schreiben und ihn oft verwenden.
  Es gibt verschiedene Möglichkeiten, Funktionen zu erstellen:
  1. Funktionsdeklaration (Function Declaration)
  2. Funktionsausdruck (Function Expression)
  3. Arrow-Funktion (Pfeilfunktion)
*/

// Teil 1: Funktionsdeklarationen

// 1. Deklariere eine Funktion ohne Parameter, die etwas in der Konsole ausgibt
function greet() {
  console.log("Hello, World!");
}

// Rufe die Funktion auf
greet();

// 2. Deklariere eine Funktion mit einem Parameter, die etwas zurückgibt
function square(number) {
  return number * number;
  //   return number ** 2
  //   Math.pow(number, 2)
}

// Rufe die Funktion auf und speichere das Ergebnis
let resultSquare = square(5);

// Gib das Ergebnis in der Konsole aus
console.log(resultSquare);

// 3. Deklariere eine Funktion mit einem Parameter, die einen Kontrollfluss mit einer switch-Anweisung durchführt und entsprechend zurückgibt
function getDayName(dayNumber) {
  let dayName;
  switch (dayNumber) {
    case 0:
      dayName = "Sunday";
      break;
    case 1:
      dayName = "Monday";
      break;
    case 2:
      dayName = "Tuesday";
      break;
    case 3:
      dayName = "Wednesday";
      break;
    case 4:
      dayName = "Thursday";
      break;
    case 5:
      dayName = "Friday";
      break;
    case 6:
      dayName = "Saturday";
      break;
    default:
      dayName = "Invalid day number";
  }
  return dayName;
}

// Rufe die Funktion auf und speichere das Ergebnis
let resultDayName = getDayName(3);

// Gib das Ergebnis in der Konsole aus
console.log(resultDayName);

// Teil 2: Funktionsausdrücke (Function Expressions)

// 1. Funktionsausdruck ohne Parameter
const greetExpression = function () {
  console.log("Hello again, World!");
};

// Rufe die Funktion auf
greetExpression();

// 2. Funktionsausdruck mit einem Parameter
const squareExpression = function (number) {
  return number * number;
};

// Rufe die Funktion auf und speichere das Ergebnis
let resultSquareExpression = squareExpression(5);

// Gib das Ergebnis in der Konsole aus
console.log(resultSquareExpression);

// 3. Funktionsausdruck mit einem Parameter und einer switch-Anweisung
const getDayNameExpression = function (dayNumber) {
  let dayName;
  switch (dayNumber) {
    case 0:
      dayName = "Sunday";
      break;
    case 1:
      dayName = "Monday";
      break;
    case 2:
      dayName = "Tuesday";
      break;
    case 3:
      dayName = "Wednesday";
      break;
    case 4:
      dayName = "Thursday";
      break;
    case 5:
      dayName = "Friday";
      break;
    case 6:
      dayName = "Saturday";
      break;
    default:
      dayName = "Invalid day number";
  }
  return dayName;
};

// Rufe die Funktion auf und speichere das Ergebnis
let resultDayNameExpression = getDayNameExpression(3);

// Gib das Ergebnis in der Konsole aus
console.log(resultDayNameExpression);

/*
Diskussion:
- Funktionsdeklarationen werden "gehoistet" (an den Anfang ihres Scopes verschoben), was bedeutet, dass sie aufgerufen werden können, bevor sie im Code deklariert wurden.
- Funktionsausdrücke werden nicht gehoistet, sie können also nicht aufgerufen werden, bevor sie definiert wurden.
*/

console.groupEnd();

// ==========================================
// AUFGABE 7: VARIABLEN UND GÜLTIGKEITSBEREICH (SCOPE)
// ==========================================
console.group("AUFGABE 7: VARIABLEN UND GÜLTIGKEITSBEREICH (SCOPE)");

var myVar = "Global with var";
function test() {
  // var, let und const verhalten sich sehr ähnlich, wenn es um den Function Scope geht
  var myVar = "Function scoped with var";
  //   console.log(myVar);
}

test();
// console.log(myVar);

let myLetVar = "something";

// let und const sind auf die Blöcke beschränkt, in denen sie deklariert wurden (Block Scope)
if (true) {
  var myVar = "re-declared";
  let myLetVar = "something else";
  console.log(myLetVar);
  //   console.log(myVar);
}

console.log(myLetVar);
// console.log(myVar);

console.groupEnd();
