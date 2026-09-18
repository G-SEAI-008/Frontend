# First Assertions – einfache Musterlösung

Grundlage ist `Excercise/01-first-assertions-STARTER`. Das Verhalten der neun Hilfsfunktionen ist unverändert; an der Timer-Simulation wurde lediglich ein Lint-Kommentar ergänzt. Das schlanke Vite-Setup folgt dem Vitest-Intro-FINAL. TypeScript prüft im Strict-Modus auch die Testdateien.

## Starten

```bash
npm install
npm test
```

Einmal prüfen oder die Demo öffnen:

```bash
npm test -- --run
npm run typecheck
npm run build
npm run dev
```

`build` führt TypeScript, Tests und anschließend Vite aus.

## Was zeigen die Tests?

| Datei in `src/utils/` | Schwerpunkt |
| --- | --- |
| `groupBillCalculator.test.ts` | Objektinhalte, gerundete Zahlen und geworfene Fehler |
| `playlistNameFormatter.test.ts` | Textbereinigung, Schreibweisen und leere Eingabe |
| `cutestAnimalFinder.test.ts` | Auswahl, Gleichstand und leere Liste |
| `emojiCounter.test.ts` | Zählen und eine dokumentierte Grenze der Implementierung |
| `movieSorter.test.ts` | Sortieren und unverändertes Eingabearray |
| `passwordGenerator.test.ts` | Länge, erlaubte Zeichen und ungültige Optionen |
| `pizzaOrderValidator.test.ts` | Gültige Bestellung und einfache Validierungsfehler |
| `superheroNameGenerator.test.ts` | Aufbau zufällig erzeugter Namen |
| `catFactFetcher.test.ts` | Mit `await` auf ein asynchrones Ergebnis warten |

Jeder Test besteht aus einer kleinen Vorbereitung, einem Funktionsaufruf und einer oder wenigen Assertions. `toStrictEqual` vergleicht Objekt- und Arrayinhalte; `toBe` eignet sich auch für die Identität eines zurückgegebenen Objekts. Bei `toThrow` wird der Aufruf in eine Funktion verpackt.

Die Zufallstests verlangen nicht, dass zwei Aufrufe unterschiedliche Ergebnisse liefern: Wiederholungen sind erlaubt. Auch ein Passwort muss nicht jede aktivierte Zeichenart enthalten. Diese Tests benötigen deshalb noch keine Mocks. Die Cat-Fact-Funktion wartet tatsächlich kurz, ruft aber keinen Server auf.

## Ein bewusst dokumentierter Fehler

`countEmojisInMessage('👨‍👩‍👧‍👦')` zählt die vier Bestandteile statt eines Familien-Emojis. Der entsprechende `test.fails` beschreibt das gewünschte Ergebnis `1` und erwartet, dass der unveränderte Starter diese Assertion verletzt. Entferne `.fails`, um den roten Test zu sehen. Falls die Funktion später korrigiert wird, muss auch `.fails` entfernt werden.

Ergebnis: **32 reguläre Tests bestanden und 1 erwarteter Fehlschlag**. Das ist keine Aussage, dass alle denkbaren Eingaben korrekt verarbeitet werden.

## Linting

Auf Kawas Rechner prüft `npm run lint:global` ausdrücklich mit `~/.oxlintrc.json`. Dafür muss Oxlint global verfügbar sein. `npm run lint` nutzt die jeweils automatisch gefundene Konfiguration.

Die globale Prüfung läuft ohne Meldungen. Drei harmlose Hinweise in `catFactFetcher.ts` sind gezielt per Kommentar ausgenommen: `promise/avoid-new`, `no-promise-executor-return` und `typescript/strict-void-return`. Der Timer gibt eine unbenutzte Timer-ID zurück; der Promise wird trotzdem korrekt aufgelöst. Die Funktionslogik bleibt gemäß Aufgabenstellung unverändert.

Wie im Vorlesungs-FINAL wird `vitest/prefer-expect-assertions` für die direkten Lernbeispiele mit Kommentar deaktiviert. Zusätzliche Assertion-Zähler würden hier keinen Lerngewinn bringen.
