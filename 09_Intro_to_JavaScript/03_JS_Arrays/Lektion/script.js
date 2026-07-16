/**
 * JAVASCRIPT ARRAYS (Pythons "Listen")
 * ====================================
 *
 * Arrays in JS sind genau wie Listen in Python.
 * Sie sind dynamische, geordnete Sammlungen, die gemischte Datentypen aufnehmen können.
 *
 * Haupteigenschaften:
 * - Nullbasiert (zero-indexed, das erste Element ist an Position 0)
 * - Dynamische Größe (können wachsen oder schrumpfen)
 * - Mutierende vs. nicht-mutierende Methoden (Entscheidender Unterschied!)
 */

// ==========================================
// ARRAYS ERSTELLEN
// ==========================================

console.group("=== ARRAYS ERSTELLEN ===");

// Python: fruits = ["apple", "banana", "orange"]
const fruits = ["apple", "banana", "orange"];
// Hinweis: Obwohl wir 'const' verwenden, KÖNNEN wir den Inhalt des Arrays ändern.
// 'const' bedeutet nur, dass wir der Variable 'fruits' kein komplett neues Array zuweisen können.

const mixedArray = [
  1,
  "three",
  true,
  { name: "John", age: 30 }, // JS-Objekt (wie ein Python-Dictionary)
  ["a", "b", "c"],
];

console.log(fruits);

console.groupEnd();

// ==========================================
// AUF ELEMENTE ZUGREIFEN
// ==========================================

console.group("\n=== AUF ELEMENTE ZUGREIFEN ===");

console.log("Erstes Element:", fruits[0]);

// PYTHON-FALLE: In Python verwendet man fruits[-1], um das letzte Element zu erhalten.
// In JS gibt fruits[-1] 'undefined' zurück!
console.log("Letztes Element:", fruits[fruits.length - 1]);

console.log("Letztes Element:", fruits.at(-1));

console.groupEnd();

// ==========================================
// ELEMENTE HINZUFÜGEN & ENTFERNEN
// ========================================
// Alle Methoden in diesem Abschnitt MUTIEREN (verändern) das ursprüngliche Array
// ==========================================

console.group("\n=== ELEMENTE HINZUFÜGEN & ENTFERNEN ===");

// push() - Python-Äquivalent: list.append()
const pushArray = ["apple", "banana"];
pushArray.push("grape");
console.log("Nach push():", pushArray);

// pop() - Python-Äquivalent: list.pop()
const popArray = ["apple", "banana", "grape"];
popArray.pop(); // entfernt "grape"
console.log("Nach pop():", popArray);

// unshift() - Python-Äquivalent: list.insert(0, item)
const unshiftArray = ["apple", "banana"];
unshiftArray.unshift("mango"); // Fügt am Anfang hinzu
console.log("Nach unshift():", unshiftArray);

// shift() - Python-Äquivalent: list.pop(0)
const shiftArray = ["mango", "apple", "banana"];
shiftArray.shift(); // Entfernt am Anfang
console.log("Nach shift():", shiftArray);

console.groupEnd();

// ========================================
// ARRAYS MODIFIZIEREN
// ========================================

console.group("\n=== ARRAYS MODIFIZIEREN ===");

// reverse() vs toReversed()
// Python-Äquivalent: list.reverse() (mutierend) vs reversed(list) (nicht-mutierend)
const originalArray = ["apple", "banana", "orange"];
const reversedArray = originalArray.toReversed(); // Nicht-mutierend
console.log("Neues umgedrehtes Array:", reversedArray);
console.log("Originales Array:", originalArray);

// splice() vs toSpliced()
// Kein direktes Python-Äquivalent; ähnlich wie eine Slice-Zuweisung: list[1:2] = ["kiwi", "pear"]
const spliceArray = ["apple", "banana", "orange", "grape"];
spliceArray.splice(1, 1, "kiwi", "pear");
console.log("Nach splice():", spliceArray);

// slice() - Python-Äquivalent: list[1:3]
const sliceArray = ["apple", "banana", "orange", "grape", "kiwi"];
const sliceResult = sliceArray.slice(1, 3); // Extrahiert von Index 1 bis (aber nicht einschließlich) 3
console.log("Nach slice():", sliceResult);

// join() - Python-Äquivalent: ", ".join(list)
// PYTHON-FALLE: In Python ist join eine String-Methode. In JS ist es eine Array-Methode!
const joinArray = ["apple", "banana", "orange"];
const joinResult = joinArray.join(", ");
console.log('join(", "):\n', joinResult);

console.groupEnd();

// ========================================
// ÜBER ARRAYS ITERIEREN (SCHLEIFEN)
// ========================================

console.group("\n=== ÜBER ARRAYS ITERIEREN ===");

const fruits2 = ["apple", "banana", "cherry"];

for (let i = 0; i < fruits2.length; i++) {
  console.log(`Element an Index-Position ${i} ist ${fruits2[i]}`);
}

// PYTHON-FALLE: VERWENDE NICHT "for...in" für JS-Arrays!
// "for...in" iteriert über Indizes/Schlüssel, nicht über die tatsächlichen Werte.

// Verwendung der for...of Schleife - Python-Äquivalent: for item in list:
// Genau so iteriert man in Python über eine Liste!
console.log("\nVerwendung einer for...of Schleife:");
for (const fruit of fruits2) {
  console.log(`Aktuelle Frucht: ${fruit}`);
}

console.groupEnd();
