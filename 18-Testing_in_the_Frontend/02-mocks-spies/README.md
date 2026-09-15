# Vitest — Kurzreferenz

## Terminal

```bash
npm run test                                     # Watch-Modus; q beendet
npm run test -- --run                             # Alle Tests einmal
npm run test -- --reporter=verbose                # Testnamen anzeigen
npm run test -- --run src/mockBasics.test.ts       # Vorhandenen Test ausführen
npm run test -- --run src/utils/getPost.test.ts
```

## Testaufbau

| Aufruf                                     | Zweck                         |
| ------------------------------------------ | ----------------------------- |
| `describe('Gruppe', () => { … })`          | Tests gruppieren              |
| `test('Fall', () => { … })` / `it(...)`    | Test definieren               |
| `expect(wert)`                             | Assertion beginnen            |
| `beforeEach(() => { … })`                  | Vor jedem Test                |
| `afterEach(() => { … })`                   | Nach jedem Test               |
| `beforeAll(() => { … })` / `afterAll(...)` | Einmal vor / nach allen Tests |

## Matcher

| Aufruf                                          | Prüft                                     |
| ----------------------------------------------- | ----------------------------------------- |
| `.toBe(x)`                                      | Gleichheit der Werte (===)                |
| `.toEqual(x)` / `.toStrictEqual(x)`             | Objektinhalt / zusätzlich genaue Struktur |
| `.toBeCloseTo(x)`                               | Gleitkommazahl                            |
| `.toBeTruthy()` / `.toBeFalsy()`                | Truthy / falsy                            |
| `.toContain(x)` / `.toHaveLength(n)`            | Enthaltenen Wert / Länge                  |
| `.toMatch(/regex/)` / `.toBeDefined()`          | Textmuster / nicht `undefined`            |
| `.toThrow('Text')`                              | Geworfenen Fehler                         |
| `.not.toBe(x)`                                  | Verneinte Erwartung                       |
| `.toHaveBeenCalledWith(...)`                    | Aufruf mit diesen Argumenten              |
| `.toHaveBeenCalledExactlyOnceWith(...)`         | Genau einen Aufruf mit diesen Argumenten  |
| `await expect(promise).resolves.toEqual(x)`     | Erfülltes Promise                         |
| `await expect(promise).rejects.toThrow('Text')` | Abgelehntes Promise                       |

## Mocks und Spies

| Aufruf                              | Zweck                                               |
| ----------------------------------- | --------------------------------------------------- |
| `vi.fn()` / `vi.fn<typeof fetch>()` | Mock erzeugen / typisieren                          |
| `.mockReturnValue(wert)`            | Direkte Rückgabe festlegen                          |
| `.mockResolvedValue(wert)`          | Promise mit diesem Wert erfüllen                    |
| `.mockResolvedValueOnce(wert)`      | Nur den nächsten Aufruf so erfüllen                 |
| `.mockRejectedValueOnce(error)`     | Nächstes Promise ablehnen                           |
| `vi.stubGlobal('fetch', mock)`      | Globales `fetch` ersetzen                           |
| `vi.mocked(fetch)`                  | Mock-Typ für TypeScript; erzeugt keinen Mock        |
| `vi.spyOn(console, 'log')`          | Aufrufe beobachten; Original läuft weiter           |
| `.mockImplementation(() => {})`     | Verhalten durch leere Funktion ersetzen             |
| `consoleSpy.mockRestore()`          | Einzelnen Spy zurücksetzen                          |
| `vi.unstubAllGlobals()`             | Globale Stubs zurücksetzen, etwa `fetch`            |
| `vi.restoreAllMocks()`              | Spy-Methoden wiederherstellen; keine globalen Stubs |
