# React Testing Library und Mocks – Musterlösung

Dieses Projekt baut auf der vorhandenen React-Lösung und dem RTL-FINAL der Vorlesung auf. Es enthält jetzt Lösungen für **`testing-react-components.md` und anschließend `mocks.md`**.

## Starten

```bash
aube install
npm test -- --run
npm run dev
```

Ohne Aube funktioniert auch `npm install`. `npm test` startet den Watch-Modus.

## 1. React-Komponenten testen

| Datei | Beispiele |
| --- | --- |
| `src/test/Counter.test.tsx` | Die 18 vorhandenen Vorlesungstests |
| `src/test/ContactForm.test.tsx` | Beschriftete Eingaben, Pflichtfelder, ungültige E-Mail, Senden und Erfolg |
| `src/test/UserList.test.tsx` | Laden, Suche, Hervorhebung, Suche löschen, kein Treffer, Fehler/Retry, Refresh und ungültige API-Daten |

`getBy...` sucht etwas, das schon da sein muss. `queryBy...` eignet sich für etwas, das fehlen darf. `findBy...` wartet auf ein Element, beispielsweise nach einem Fetch. Mit `fireEvent` lösen wir wie in der Vorlesung Benutzeraktionen aus.

Der erfolgreiche Formulartest überspringt die simulierte Wartezeit mit Fake Timers. `act` lässt React die dadurch ausgelösten Änderungen verarbeiten. `afterEach` stellt die echte Uhr wieder her.

Die Auswahl deckt die wesentlichen Verhaltensweisen ab. Eine Prüfung aller CSS-Klassen, jeder Suchfeld-Kombination oder ungewöhnlicher FormData-Dateiwerte gehört nicht zu dieser einfachen Musterlösung.

## 2. Funktionen mocken und ausspionieren

Aus First Assertions wurden zwei Funktionen samt ihren Unit-Tests nach `src/utils/` übernommen:

- `calculateGroupBill` mit vier Tests
- `formatPlaylistName` mit fünf Tests

Beide werden in einer eigenen Komponente verwendet und in `App.tsx` angezeigt.

### Mock: GroupBillCalculator

`src/test/GroupBillCalculator.test.tsx` ersetzt die Berechnung:

```ts
vi.spyOn(billCalculator, 'calculateGroupBill').mockReturnValue({
  subtotal: 100,
  tipAmount: 20,
  total: 120,
  perPerson: 42,
});
```

Die `42` ist absichtlich kein korrekt berechneter Anteil. Der Test prüft, ob die Komponente ihre Eingaben als `[100], 20, 4` übergibt und anschließend **das Ergebnis der Hilfsfunktion** anzeigt. Die echte Berechnung läuft hier nicht; sie wird separat in den Unit-Tests geprüft.

### Spy: PlaylistNameFormatter

`src/test/PlaylistNameFormatter.test.tsx` beobachtet die echte Funktion:

```ts
const format = vi.spyOn(playlistFormatter, 'formatPlaylistName');
```

Ohne `mockReturnValue` oder `mockImplementation` läuft die ursprüngliche Formatierung weiter. Der Test prüft den einmaligen Aufruf mit dem eingegebenen Text und das sichtbare Ergebnis. `vi.restoreAllMocks()` stellt nach jedem Test die Originalfunktionen wieder her.

Die Namespace-Imports `import * as ...` geben `spyOn` das benötigte Modulobjekt. Diese Beispiele laufen in der konfigurierten jsdom-Umgebung. Ein zusätzliches `vi.mock` oder eine Umgestaltung der Komponenten für Dependency Injection ist dafür nicht nötig.

## TypeScript, Zod und Linting

```bash
npm run typecheck
npm run build
npm run lint
npm run lint:global
```

`lint` verwendet die lokale Oxlint-Konfiguration mit Anti-Slop-Regeln. `lint:global` prüft auf Kawas Rechner zusätzlich ausdrücklich mit `~/.oxlintrc.json`; dieser Befehl setzt seine globale Konfiguration voraus.

- **39 Tests bestanden**, TypeScript und Build erfolgreich.
- Globale und lokale Oxlint-Prüfung ohne Meldungen.
- Zod prüft Nutzer aus der API, Kontaktformularwerte und die Zahlen der Rechnung. Die Playlist-Eingabe kommt als String aus dem Textfeld und benötigt keine zusätzliche Validierung.
- Email und Message haben jetzt passende IDs für ihre Labels. Veraltete CSS-Klassen wurden durch einfache gültige Klassen ersetzt.
- Beim UserList-Laden beginnen die Statusänderungen für Refresh/Retry im Click-Handler. `useCallback` hält die Fetch-Funktion für den Effect stabil.

Wenige gezielte Lint-Ausnahmen sind direkt im Code begründet: direkte Assertions ohne zusätzlichen Zähler, die Modulobjekte für `spyOn`, Node-Imports in der Vite-Konfiguration und ein Effect-Hinweis, obwohl die Fetch-Zustandsupdates erst nach `await` erfolgen. Die globalen Regeln wurden nicht verändert.

Der vorhandene `MIGRATIONSBERICHT.md` beschreibt einen älteren Stand; die aktuelle Aufgabenabdeckung und Testanzahl stehen in dieser README.
