# Test Demo

Kleines Starterprojekt, um die Vorteile von Tests kennenzulernen.

## Befehle

```bash
npm run test                        # Tests im Watch-Modus
npm run test -- --run                # Einmaliger Testlauf
npm run test -- --run src/utils/sum.test.ts
npm run test -- --reporter=verbose   # Einzelne Testnamen anzeigen
```

## Kurzreferenz

```text
describe('Gruppe', () => { … })  → Zusammengehörige Tests gruppieren
test('Testfall', () => { … })   → Einzelner Testfall
it('Testfall', () => { … })   → Andere Schreibweise für test
expect(wert)                    → Eine Erwartung prüfen
beforeEach(() => { … })         → Läuft vor jedem Test in der Gruppe

Matcher:
  .toBe(x)           → Exakte Gleichheit (ähnlich ===)
  .toEqual(x)        → Inhalte von Objekten und Arrays vergleichen
  .toStrictEqual(x)  → Wie toEqual, prüft zusätzlich die genaue Struktur
  .toBeCloseTo(x)    → Fließkommazahlen vergleichen
  .toBeTruthy()      → Truthy-Wert
  .toBeFalsy()       → Falsy-Wert
  .toContain(x)      → Array oder String enthält x
  .toHaveLength(n)   → Array oder String hat die Länge n
  .toMatch(/regex/)  → Text passt zum regulären Ausdruck
  .toBeDefined()     → Wert ist nicht undefined
  .toThrow('Text')   → Fehler werfen, der 'Text' enthält
  .not.toBe(x)       → Erwartung mit .not verneinen
  .resolves.toBe(x)  → Promise liefert x (mit await verwenden)
  .rejects.toThrow() → Promise schlägt fehl (mit await)
```

## Häufige Matcher

> <https://vitest.dev/api/expect.html#expect>

Beispiele für den Inhalt eines Tests; `sum` und `isPalindrome` kommen aus der Lecture.

```ts
// Exakte Gleichheit (ähnlich ===)
expect(sum(1, 2)).toBe(3);

// Inhalte von Objekten und Arrays vergleichen
const user = { name: 'Alice', age: 28 };
expect(user).toEqual({ name: 'Alice', age: 28 });

// Strenger Vergleich von Struktur und Inhalt
expect(user).toStrictEqual({ name: 'Alice', age: 28 });

// Fließkommazahlen (0.1 + 0.2 ist in JavaScript nicht exakt 0.3)
expect(0.1 + 0.2).toBeCloseTo(0.3);

// Truthy und falsy prüfen
expect(isPalindrome('otto')).toBeTruthy();
expect(isPalindrome('hallo')).toBeFalsy();

// Array enthält einen Wert
expect([1, 2, 3]).toContain(2);
expect([1, 2, 3]).not.toContain(9); // .not verneint die Erwartung

// Länge eines Arrays
expect([1, 2, 3]).toHaveLength(3);

// Text passt zum Muster
expect('Hallo Berlin').toMatch(/Berlin/u);
```
