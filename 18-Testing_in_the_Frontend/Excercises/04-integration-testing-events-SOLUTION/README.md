# Integration Testing: Auth-Flow und 80 % Coverage

Eine gemeinsame Musterlösung für `test-auth-flow.md` und die anschließende Aufgabe `80percent.md`. Zuerst wird der Auth-Flow getestet. Danach kommen wenige weitere Tests hinzu, bis Statements und Functions jeweils mindestens 80 % erreichen.

## Grundlage

Das Vorlesungsprojekt `04_Integration_Testing_and_coverage-FINAL` zeigt einen Warenkorb mit `CartProvider`, `CartBadge` und `ProductCard`. Es eignet sich als Vorlage für Vitest-Projekte, RTL und die Teststruktur, enthält aber weder Authentifizierung noch die Events-App der Aufgabenstellung.

Diese Lösung basiert deshalb auf [wbs-integration-testing-events](https://github.com/WebDev-WBSCodingSchool/wbs-integration-testing-events), Stand `1241a625431813c8804d5d2cb1846bdb1e88be1c`. Die ursprüngliche Aufgabenbeschreibung bleibt in [EXERCISE.md](./EXERCISE.md) erhalten. Die Vorlesungsordner wurden nicht verändert.

## Starten und prüfen

```bash
npm ci
npm test -- --run
npm run test:coverage
```

Die Tests benötigen keinen laufenden Server und keine Zugangsdaten. `.env.test` enthält nur eine lokale Beispiel-URL. Alle API-Anfragen der Tests erhalten vorbereitete Antworten über `vi.stubGlobal('fetch', ...)`.

Weitere Befehle:

```bash
npm run test:integration -- --run
npm run test:unit -- --run
npm run typecheck
npm run build
npm run lint
```

`npm test` startet den Watch-Modus. `build` prüft TypeScript, führt alle Tests aus und baut die App. Die zusätzliche Coverage-Grenze wird mit `npm run test:coverage` geprüft.

Für die App im Browser wird wie im ursprünglichen Starter ein Events-Backend benötigt:

```bash
cp .env.example .env.development.local
npm run dev
```

Trage bei Bedarf dessen API-URL in `.env.development.local` ein. Die Lösung enthält keinen zusätzlichen Demo-Server.

## Teil 1: Test Auth Flow

Beginne mit [auth.int.test.tsx](./src/__tests__/integration/auth.int.test.tsx). Die sieben Tests prüfen:

1. Login über das Formular, Anzeige des geschützten Bereichs und anschließenden Logout.
2. Registrierung mit Weiterleitung zum Login.
3. Anzeige eines vom Server abgelehnten Logins.
4. Zod-Validierung eines zu kurzen Passworts ohne API-Anfrage.
5. Weiterleitung eines Gastes vom geschützten Bereich zum Login.
6. Wiederherstellung einer Sitzung über den gespeicherten Token.
7. Entfernen einer Sitzung nach einer 401-Antwort für den abgelaufenen Token.

`renderApp('/login')` rendert den echten AuthProvider und dieselben Routen, Loader, Actions und Seiten wie die Browser-App. Nur der Router speichert die URL im Arbeitsspeicher. Diese kleine Hilfe steht in `src/test-utils/renderApp.tsx`; die geteilten Routen stehen in `src/routes.tsx`.

Die vorbereiteten Antworten bei `mockResolvedValueOnce` werden in Aufrufreihenfolge verbraucht. Beim Login sind das Login-Antwort, Profil und Eventliste. Beim direkten Aufruf von `/app` lädt der Router zuerst die Eventliste; danach fragt der Provider das Profil ab. Deshalb unterscheiden sich die Reihenfolgen in den Tests.

Der Route-Loader des Starters läuft auch vor einer Weiterleitung durch `ProtectedLayout`. Der Schutz im Frontend ersetzt daher keine Berechtigungsprüfung des Backends.

## Teil 2: 80 % Coverage

Ergänzende Tests:

| Datei | Schwerpunkt |
| --- | --- |
| [pages.int.test.tsx](./src/__tests__/integration/pages.int.test.tsx) | Startseite mit Kennzahlen, Navigation/404, Loader-Fehler und Event-Erstellung samt aktualisierter Liste |
| [events.int.test.tsx](./src/__tests__/integration/events.int.test.tsx) | Eventliste, Auswahl eines Events und Öffnen der Kartenmarkierung mit echtem Leaflet-Kontext |
| [actions.unit.test.ts](./src/actions/actions.unit.test.ts) | Netzwerkfehler, ungültige Formularwerte und fehlgeschlagene API-Antworten |

Insgesamt sind es **17 Tests: 12 Integrationstests und 5 Unit-Tests**. Kleine Testdaten stehen in `src/test-utils/fixtures.ts`. Die Assertions prüfen sichtbare Ergebnisse oder Rückgabewerte, ohne jede Kombination abzudecken.

Nach `npm run test:coverage` liegt der HTML-Bericht unter `coverage/index.html`. Öffne ihn und klicke auf eine Datei, um nicht ausgeführte Zeilen und Verzweigungen zu sehen.

| Messwert | Ergebnis |
| --- | ---: |
| Statements | 88,07 % |
| Functions | 87,09 % |
| Branches | 68,96 % |
| Lines | 88,61 % |

In `vite.config.ts` sind **80 % für Statements und Functions** als globale Mindestwerte eingetragen. Der Coverage-Befehl schlägt fehl, wenn einer dieser Werte unterschritten wird. Die Aufgabe verlangt keine 80 % für jede einzelne Datei und keine 80 % Branch-Coverage.

Gezählt wird der Anwendungscode unter `src`, einschließlich ungetesteter Dateien wie `App.tsx`. Ausgenommen sind lediglich Tests, Testhilfen, Test-Setup, Typdeklarationen und der DOM-Einstieg `main.tsx`. Weder Auth-, Event- noch Kartenlogik wird aus der Messung entfernt.

Scroll-Paginierung, sämtliche Fehlerkombinationen und ein vollständiger Browser-Test der Karte bleiben Vertiefungen. Die erreichten Prozentwerte garantieren nicht, dass die Anwendung fehlerfrei ist.

## Kleine Anpassungen am Starter

- Vitest hat zwei korrekt konfigurierte Projekte; Setup und Dateipfade funktionieren für Unit- und Integrationstests. Vitest und der V8-Coverage-Provider verwenden dieselbe Version.
- React, Vite, TypeScript und Zod wurden an die aktuellen lokalen Vorlesungsprojekte angeglichen. Das Build-Skript prüft mit `tsc -b` auch die referenzierten TypeScript-Projekte und damit alle Testdateien.
- Formularlabels haben passende IDs. Logout und Eventauswahl sind echte Buttons. Veraltete Formular-CSS-Klassen wurden ersetzt.
- Zod prüft die verwendeten API-Daten und gespeicherten Nutzerdaten. Formulare behalten ihre einfache `safeParse`-Validierung. Die Passwortmeldung passt nun zur vorhandenen Mindestlänge von acht Zeichen.
- Die Login-Funktion bleibt über `useCallback` stabil. Eine abgelehnte Profilanfrage entfernt Token und Nutzerzustand.
- Die Event-Action prüft `response.ok`, bevor sie Erfolg meldet. Ein fehlgeschlagener Request erzeugt somit keinen falschen Erfolgszustand.
- Das Schließen des Dialogs setzt das Formular zurück, ohne erneut `close()` aus seinem eigenen Close-Handler aufzurufen. Die Karte versucht bei einer leeren Eventliste keine ungültigen Grenzen zu setzen.

Die Tests ergänzen zwei fehlende Browser-Funktionen in jsdom: Beim Dialog werden `showModal` und `close` über den `open`-Zustand abgebildet. Der Karten-Test ersetzt `IntersectionObserver`, ohne automatisches Scrollen zu simulieren. Provider, Router, Actions und Kartenkomponenten bleiben echt.

## Linting und Lernumfang

`npm run lint:global` verwendet auf Kawas Rechner zusätzlich ausdrücklich `~/.oxlintrc.json`. Die globalen Einstellungen wurden nicht verändert. Diese Prüfung sowie die lokale Oxlint-Prüfung laufen ohne Meldungen.

Gezielte Kommentare erlauben die statische Startseite des Starters, dessen einfache Synchronisierung nachgeladener Router-Daten mit dem Listen-State, die Gruppierung der Typen und die einmaligen jsdom-Ergänzungen. Wie in den vorherigen Lösungen benötigen direkte Assertions keine zusätzlichen Assertion-Zähler. Für diese Übung wäre eine umfassende Umgestaltung dieser Bereiche unnötig.

Verifiziert: alle 17 Tests, Coverage-Grenzen, TypeScript, Vite-Build und beide Oxlint-Aufrufe. Die Verhaltensprüfung erfolgte in jsdom mit vorbereiteten API-Antworten; ein Live-Backend wurde nicht verwendet.

Beim Build bleibt ein Vite-Hinweis auf das über 500 kB große Bundle der Events-App mit Kartenbibliothek. Für die Testing-Übung wurde keine zusätzliche Aufteilung des Anwendungscodes eingeführt.
