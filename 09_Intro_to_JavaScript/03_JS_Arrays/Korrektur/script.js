// ==========================================
// INITIALISIERUNG (ARRAYS / LISTEN)
// ==========================================
console.group("INITIALISIERUNG (ARRAYS / LISTEN)");
/*
  In JavaScript heißen Pythons "Listen" Arrays.
  Sie funktionieren fast identisch: Sie können verschiedene Datentypen 
  gleichzeitig speichern und sind nullbasiert (Index beginnt bei 0).
*/

// Schritt 1: Initialisiere ein Array mit verschiedenen Datentypen
// Python: my_list = [42, "Hello, world!", True, 3.14, "JavaScript"]
const myArray = [42, "Hello, world!", true, 3.14, "JavaScript"];

// Schritt 2: Gib das Array in der Konsole aus
console.log(myArray);

// Schritt 3: Greife auf jedes Element des Arrays zu und gib es aus
console.log(myArray[0]); // Gibt aus: 42
console.log(myArray[1]); // Gibt aus: Hello, world!
console.log(myArray[2]); // Gibt aus: true
console.log(myArray[3]); // Gibt aus: 3.14
console.log(myArray[4]); // Gibt aus: JavaScript

// PYTHON-VERGLEICH: for i in range(len(myArray)):
for (let i = 0; i < myArray.length; i++) {
  console.log(myArray[i]);
}

// Schritt 4: Ändere das zweite Element des Arrays
// (Obwohl es 'const' ist, können wir die INHALTE des Arrays ändern)
myArray[1] = "Changed value";

// Gib das geänderte Array aus
console.log(myArray);

console.groupEnd();

// ==========================================
// PUSH, POP, SHIFT UND UNSHIFT (ELEMENTE HINZUFÜGEN/ENTFERNEN)
// ==========================================
console.group("PUSH, POP, SHIFT UND UNSHIFT (ELEMENTE HINZUFÜGEN/ENTFERNEN)");

// Schritt 1: Initialisiere ein Array mit Startwerten
const myArray2 = [1, 2, 3, 4, 5];

// Schritt 2: Elemente am ENDE des Arrays hinzufügen mit .push
// Python-Äquivalent: list.append()
myArray2.push(6);
myArray2.push(7);

// Gib das Array nach der Verwendung von .push aus
console.log(myArray2); // Gibt aus: [1, 2, 3, 4, 5, 6, 7]

// Schritt 3: Das LETZTE Element entfernen mit .pop
// Python-Äquivalent: list.pop()
myArray2.pop();

// Gib das Array nach der Verwendung von .pop aus
console.log(myArray2); // Gibt aus: [1, 2, 3, 4, 5, 6]

// Schritt 4: Das ERSTE Element entfernen mit .shift
// Python-Äquivalent: list.pop(0)
myArray2.shift();

// Gib das Array nach der Verwendung von .shift aus
console.log(myArray2); // Gibt aus: [2, 3, 4, 5, 6]

// Schritt 5: Elemente am ANFANG des Arrays hinzufügen mit .unshift
// Python-Äquivalent: list.insert(0, item)
myArray2.unshift(0);
myArray2.unshift(-1);

// Gib das Array nach der Verwendung von .unshift aus
console.log(myArray2); // Gibt aus: [-1, 0, 2, 3, 4, 5, 6]

console.groupEnd();

// ==========================================
// UMKEHREN (REVERSING)
// ==========================================
console.group("UMKEHREN (REVERSING)");

// Array 1: Die reverse() Methode verwenden (Mutierend / verändert das Original)
// Python-Äquivalent: list.reverse()
const array1 = [1, 2, 3, 4, 5];
console.log("Original array1:", array1);

// array1 "in-place" (direkt) umkehren und das Ergebnis ausgeben
array1.reverse();
console.log("Reversed array1:", array1);

// Array 2: Die toReversed() Methode verwenden (Nicht-mutierend / erstellt eine Kopie)
// Python-Äquivalent: reversed(list) oder list[::-1]
const array2 = ["a", "b", "c", "d", "e"];
console.log("Original array2:", array2);

// Eine umgekehrte Kopie von array2 erstellen und beide Arrays ausgeben
const reversedArray2 = array2.toReversed();
console.log("Reversed copy of array2:", reversedArray2);
console.log("Original array2 after toReversed:", array2); // Original bleibt unverändert

console.groupEnd();

// ==========================================
// SPLICING (ELEMENTE ERSETZEN/EINFÜGEN)
// ==========================================
console.group("SPLICING (ELEMENTE ERSETZEN/EINFÜGEN)");

// Array 1: Die splice() Methode verwenden (Mutierend)
// Python-Äquivalent: Slice-Zuweisung wie list[2:3] = [35, 36]
const array3 = [10, 20, 30, 40, 50];
console.log("Original array1:", array3);

// array1 "in-place" ändern: Entferne 1 Element an Index 2 und füge 35, 36 hinzu
array3.splice(2, 1, 35, 36);
console.log("Modified array1:", array3);

// Array 2: Die toSpliced() Methode verwenden (Nicht-mutierend)
const array4 = ["x", "y", "z"];
console.log("Original array2:", array4);

// Eine modifizierte Kopie von array2 erstellen: Entferne 1 Element an Index 1 und füge 'a', 'b' hinzu
const modifiedArray4 = array4.toSpliced(1, 1, "a", "b");
console.log("Modified copy of array2:", modifiedArray4);
console.log("Original array2 after toSpliced:", array4); // Original bleibt unverändert

console.groupEnd();

// ==========================================
// SLICING (TEILBEREICHE EXTRAHIEREN)
// ==========================================
console.group("SLICING (TEILBEREICHE EXTRAHIEREN)");

const newArray = [1, 2, 3, 4, 5];

// Python-Äquivalent: newArray[1:4]
const slicedArray1 = newArray.slice(1, 4); // Von Index 1 bis (aber nicht einschließlich) 3
console.log("Sliced portion (index 1 to 3):", slicedArray1);

// Python-Äquivalent: newArray[3:]
const slicedArray2 = newArray.slice(3); // Von Index 3 bis zum Ende
console.log("Sliced portion (from index 3 to end):", slicedArray2);

// Python-Äquivalent: newArray[-4:]
const slicedArray3 = newArray.slice(-4); // Die letzten 4 Elemente
console.log("Sliced portion (last 4 elements):", slicedArray3);

// Das Original-Array bleibt beim Slicing immer unverändert!
console.log("Original array after slicing:", newArray);

console.groupEnd();

// ==========================================
// JOINING (ZUSAMMENFÜGEN ZU EINEM STRING)
// ==========================================
console.group("JOINING (ZUSAMMENFÜGEN ZU EINEM STRING)");

const array = ["apple", "banana", "cherry", "date"];

// PYTHON-FALLE: In Python rufst du join() auf dem String auf (", ".join(array)).
// In JS rufst du es auf dem Array auf (array.join(", "))!

// Erstelle verschiedene Strings, indem du die Array-Elemente mit verschiedenen Trennzeichen zusammenfügst
const joinedWithComma = array.join(); // Standard-Trennzeichen ist das Komma
console.log("Joined with comma:", joinedWithComma);

const joinedWithDash = array.join("-"); // Bindestrich als Trennzeichen verwenden
// Python: "-".join(array)
console.log("Joined with dash:", joinedWithDash);

const joinedWithSpace = array.join(" "); // Leerzeichen als Trennzeichen verwenden
console.log("Joined with space:", joinedWithSpace);

const joinedWithAnd = array.join(" and "); // ' and ' als Trennzeichen verwenden
console.log("Joined with 'and':", joinedWithAnd);

const joinedWithoutDelimiter = array.join(""); // Ganz ohne Trennzeichen
console.log("Joined without delimiter:", joinedWithoutDelimiter);

console.groupEnd();

// ==========================================
// SCHLEIFEN (LOOPS) ÜBER ARRAYS
// ==========================================
console.group("SCHLEIFEN (LOOPS) ÜBER ARRAYS");

// Schritt 1: Initialisiere ein Array mit Zahlen
const numberArray = [10, 20, 30, 40, 50];

// Schritt 2: Iteriere über das Array mit einer Standard-for-Schleife
// Python: for i in range(len(numberArray)):
for (let i = 0; i < numberArray.length; i++) {
  console.log(numberArray[i]);
}

// Schritt 3: Iteriere über das Array mit einer for...of Schleife (DER BESTE WEG)
// Python: for num in numberArray:
for (const num of numberArray) {
  console.log(num);
}

// Schritt 4: Initialisiere ein Array mit Objekten (wie eine Liste von Dictionaries)
const objectArray = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];

// Schritt 5: Iteriere über das Array von Objekten mit einer Standard-for-Schleife
for (let i = 0; i < objectArray.length; i++) {
  console.log(`Name: ${objectArray[i].name}, Age: ${objectArray[i].age}`);
}

// Schritt 6: Iteriere über das Array von Objekten mit einer for...of Schleife
for (const obj of objectArray) {
  // Python: f"Name: {obj['name']}, Age: {obj['age']}"
  console.log(`Name: ${obj.name}, Age: ${obj.age}`);
}

console.groupEnd();
