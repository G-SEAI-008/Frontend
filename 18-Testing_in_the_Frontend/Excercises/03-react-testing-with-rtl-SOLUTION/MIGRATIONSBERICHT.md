# TypeScript-7- und Zod-Migration

Aktueller Ordner: `react-testing-with-rtl-EXERCISE-SOLUTIONS`.

Übungslösungen: Alle drei Testdateien sind enthalten (21 Tests). Die separate Lecture-Version enthält ausschließlich die Counter-Tests.

Die folgenden Abschnitte und ursprünglichen Prüfprotokolle dokumentieren die Migration vor dieser Aufteilung. Aktuelle Prüfungen nach der Aufteilung stehen unter `migration-checks/split-*`. Bestätigt: 21/21 Tests bestanden; Typecheck und type-aware Oxlint bestanden (nur bestehende Warnung zur Kommentar-Lehrdatei). Bei der Aufteilung wurden die verloren gegangenen `i`-Flags in Counter-Testqueries wiederhergestellt und minimale Lint-Korrekturen vorgenommen.

Die Vorlage war bereits ein Vite-/React-Projekt mit `.ts`/`.tsx`, TypeScript **7.0.2** und Zod **4.6.5**. Es waren daher keine Dateiumbenennungen oder Versionswechsel dieser Pakete nötig. **Next.js ist weder im Manifest noch im Lockfile enthalten**; die TypeScript-6-/ESLint-9-Ausnahme trifft nicht zu.

## Änderungen und Datenübergänge

| Datei | Änderung |
| --- | --- |
| `src/components/UserList.tsx` | `UserSchema` prüft `id`, `name`, `email`, `username`. `User` wird mit `z.infer<typeof UserSchema>` abgeleitet. Die Antwort von `response.json()` erhält zunächst `unknown`; `z.array(UserSchema).parse(data)` prüft sie einmal vor `setUsers`. |
| `src/components/ContactForm.tsx` | Vorhandenes Schema zu `ContactFormSchema` umbenannt; benannter Zod-Import. `FormValues` bleibt aus `z.infer` abgeleitet. Vier Assertions entfernt. `safeParse` prüft die Formularwerte einmal. Zod-4-kompatibel `error.issues` statt `error.errors`; Feldnamen werden durch direkte Vergleiche eingegrenzt. |
| `src/components/Counter.tsx` | Verständlich benannter `CounterProps`-Type-Alias statt Inline-Objekttyp. |
| `src/main.tsx` | DOM-Element auf Existenz eingegrenzt statt Non-Null Assertion. Bei fehlendem Root-Element klarer Fehler. |
| `src/components/index.ts` | Nur die von Anti-Slop verlangten Leerzeilen. |
| `src/vitest.setup.ts` | `@testing-library/jest-dom/vitest` bindet die Matcher auch typseitig an Vitest an. |
| `src/test/UserList.test.tsx` | Zwei zusätzliche Integrationstests für gültige API-Daten mit Suche sowie eine ungültige ID. |
| `src/test/ContactForm.test.tsx` | Fünf zusätzliche Integrationstests: gültige Übermittlung mit/ohne Newsletter, leeres Formular, ungültige E-Mail und Datei statt Text. |

`subscribe` wird schon beim Auslesen des Formulars durch `=== 'on'` zu einem Boolean. Deshalb ist `.optional()` an dieser Stelle entfallen: An diesem Schema kommt immer `true` oder `false` an. Es gibt keine zusätzlichen Prüfungen interner React-Zustände, keine Schema-Fabriken, Transformationen oder neuen Fehler-Wrapper.

Der Rückgabetyp von `submitAction` und die generischen Argumente von `useActionState` werden nun inferiert. Bestehende notwendige Parameter- und State-Typen bleiben erhalten. Es werden keine Interfaces, `any`, Type Assertions, Non-Null Assertions oder `@ts-ignore` im Anwendungscode verwendet.

### Bewusste Abwägungen für Lerncode

- Bei `fetch` ist `unknown` nötig, weil `response.json()` keine verlässliche Inhaltsstruktur liefert.
- `FormData.get()` liefert bereits `string | File | null`. Das daraus erzeugte Objekt bleibt inferiert. Eine zusätzliche `unknown`-Annotation würde bekannte Typinformationen verwerfen und die verlangte Anti-Slop-Regel `no-known-value-widening` verletzen. Zod prüft dennoch die tatsächlichen Laufzeitwerte. Statt zusätzlicher Variablen nur zur formalen Erfüllung der `unknown`-Vorgabe wird dieser Konflikt hier dokumentiert.
- Die vorhandene Schreibweise `Partial<Record<keyof FormValues, string>>` für Feldfehler bleibt erhalten. Sie bindet optionale Fehlermeldungen an die Schema-Felder und vermeidet eine zweite manuell gepflegte Feldliste als Typ. Es wurden keine neuen fortgeschrittenen Typabstraktionen eingeführt. Das ist eine bewusste Beibehaltung der vorhandenen Utility Types zugunsten der Strukturtreue.
- Der bestehende Promise im Lade-Effect wird mit `void` ausdrücklich gestartet; `fetchUsers` behandelt Fehler weiterhin selbst.
- Anti-Slop-Leerzeilen wurden per Autofix ergänzt. Ein zweiter Durchlauf änderte keine Datei. Ein eigener Formatter war nicht konfiguriert und wurde nicht zusätzlich eingeführt.

## Verhalten

Für gültige Daten bleiben Counter-Logik, Suche, Darstellung, Formularausgabe einschließlich `subscribe`, die Wartezeit von zwei Sekunden und der Erfolgszustand erhalten. Die 14 vorhandenen Counter-Tests bestehen weiterhin. Die zusätzlichen Tests bestätigen gültige Benutzerlisten samt Suche sowie beide erfolgreichen Formularvarianten einschließlich Pending-Zustand und geloggter Daten.

Ungültige API-Daten lösen nun einen Zod-Validierungsfehler aus. Der vorhandene `catch` zeigt dessen Meldung und den vorhandenen Retry-Button; ungültige Daten gelangen nicht in die Tabelle. Zusätzliche API-Felder außerhalb der vier verwendeten Felder werden von Zod nicht weitergegeben; die Anwendung verwendet diese Felder nicht.

Ungültige Formularwerte liefern weiterhin Feldfehlermeldungen über `safeParse`. Der bisherige Zugriff auf `error.errors` hätte mit dem installierten Zod 4 einen Fehler ausgelöst; diese notwendige Kompatibilitätskorrektur ermöglicht die vorhandene Fehleranzeige. Dateiwerte in Textfeldern werden tatsächlich abgewiesen, statt mit einem Type Cast als String behandelt zu werden.

Die Bestätigung beruht auf Integrationstests in jsdom und dem Produktionsbuild, nicht auf einer vollständigen manuellen Browserprüfung oder einem Live-Test des externen Dienstes.

## Technisch notwendige Konfiguration

- `tsconfig.app.json`: `strict: true`; entferntes `baseUrl` und dafür nicht mehr benötigtes `ignoreDeprecations` entfernt. Der Alias verwendet direkt `"@/*": ["./src/*"]`. Andere Optionen bleiben unverändert.
- `vite.config.ts`: `defineConfig` aus `vitest/config` importiert, damit die vorhandene `test`-Konfiguration typisiert ist. Drei bereits unbenutzte Node-Pfad-Einträge entfernt. Vite-Plugins, Aliasziel, Testumgebung und Setup-Pfad bleiben erhalten.
- `package.json`: zusätzliche Skripte `typecheck`, `lint:oxlint`, `lint:types`, `analyze`; vier neue Dev-Abhängigkeiten. Das vorhandene ESLint-Skript und seine Regeln bleiben unverändert.
- `.oxlintrc.json`: neu angelegt; generisches Anti-Slop-Plugin registriert. Alle 18 generischen Anti-Slop-Regeln und `oxc/no-accumulating-spread` sind Fehler. Sämtliche vom Skill verlangten Agent-Ignore-Muster sowie Plugin-Verzeichnis und Build-Ausgabe sind berücksichtigt.
- `aube-lock.yaml`: aus dem vorhandenen `package-lock.json` importiert und um die Prüfwerkzeuge erweitert. Das anschließend veraltete `package-lock.json` wurde in der Kopie durch diesen Aube-Lockfile ersetzt.

## Prüfungen

Die Rohprotokolle liegen unter `migration-checks/`. `baseline-*` dokumentiert die Vorlage vor den Quellcodeänderungen. Die erstmalig installierten Oxlint-/Fallow-Werkzeuge wurden ebenfalls vor den Quellcodeänderungen ausgeführt; diese Baseline enthält bereits den verlangten vendorten Plugin-Code.

| Prüfung | Ausgangszustand | Abschluss |
| --- | --- | --- |
| Typecheck | Entferntes `baseUrl`, ungültige Aliaswerte, drei unbenutzte Vite-Einträge, untypisierte Vitest-Konfiguration | Bestanden |
| Vitest | 14/14 Tests bestanden | **21/21 Tests in drei Dateien bestanden** |
| Produktionsbuild | Kein separater Baseline-Build; Typecheck bereits fehlgeschlagen | Bestanden |
| Oxlint | Assertion- und Leerzeilenfehler, vier Warnungen | Bestanden; zwei bestehende Warnungen |
| `oxlint --type-aware --type-check` | Zusätzlich TypeScript-Konfigurationsfehler | Bestanden; dieselben zwei bestehenden Warnungen |
| Anti-Slop | Mehrere Befunde in der Vorlage | Alle aktivierten Regeln ohne Fehler |
| Fallow vollständig | 23 Dead-Code-/Abhängigkeitsbefunde, vier Klon-Gruppen, 91 Health-Befunde | Gleiche Anzahlen; Analyse vollständig durchgeführt |
| Vorhandenes ESLint 10 | Start scheitert: `typescript-eslint` unterstützt TypeScript 7.0 nicht | Derselbe bestehende Kompatibilitätsfehler |
| ESLint 9 für Next.js 16 | Nicht zutreffend | Nicht zutreffend |

Nach dem ersten Konfigurationsschritt und nach der Datenvalidierung bestanden jeweils erneut alle 14 ursprünglichen Tests. Anschließend bestanden alle 21 Tests. Der durch die aktivierte Prüfung sichtbar gewordene Matcher-Typfehler wurde über den Vitest-spezifischen Setup-Import behoben. Eine zwischenzeitliche Anti-Slop-Warnung zur `unknown`-Annotation und die Warnung zum nicht markierten Promise wurden vor Abschluss beseitigt.

### Verbleibende bestehende Befunde

- Oxlint `no-unused-vars`: unbenutzter `it`-Import in `src/test/Counter.test.tsx`. Der ursprüngliche Lehrtest bleibt unverändert.
- Oxlint `no-empty-file` und Fallow: `src/utils/KeyConecepts.ts` enthält ausschließlich didaktische Kommentare. Diese Lehrdatei wird nicht gelöscht oder künstlich mit Code gefüllt.
- Fallow ordnet `@tailwindcss/vite` als test-only und `daisyui` als Dev-Abhängigkeit im Produktionspfad ein. Beide stammen aus der Vorlage und werden für CSS/Build verwendet. Keine fachfremde Umgruppierung der Abhängigkeiten.
- ESLint 10.10.0 mit `typescript-eslint` 8.70.0 startet unter TypeScript 7.0.2 nicht. Kein Downgrade, keine Regelabschwächung und kein zusätzlicher TypeScript-6-Compiler wurden eingeführt. Die verlangten TypeScript-7- und Oxlint-Prüfungen funktionieren.
- Bereits fehlende `id`-Zuordnungen bei E-Mail-/Nachrichten-Labels wurden nicht als fachfremde UI-Änderung korrigiert. Die neuen Tests verwenden dort die bestehenden Platzhalter.

### Durch die Werkzeuginstallation hinzugekommene Befunde

Die 20 weiteren Fallow-Dead-Code-Befunde betreffen sieben Dateien und 13 Exporte des kopierten Plugins, insbesondere dessen absichtlich nicht aktivierten Effect-Zweig. Auch alle vier Klon-Gruppen und 91 Health-Befunde liegen im vendorten Plugin. Sie wurden bereits vor der Quellcodemigration erfasst und haben sich zahlenmäßig nicht erhöht. Die vollständige Analyse umfasst den Plugin-Code; es wurden keine Fallow-Filter oder Unterdrückungen hinzugefügt. Fremden Plugin-Code wegen dieser Analyse umzubauen würde die geforderte unveränderte Vendorisierung verletzen.

Es bleiben keine neuen Typecheck-, Oxlint- oder Anti-Slop-Fehler in Anwendung oder Tests. Die Fallow-Health-Werte verwenden statisch geschätzte Abdeckung; sie sind kein ausgeführter Coverage-Test.

## Abhängigkeiten und Versionen

**Laufzeit:** Keine neue Abhängigkeit. Zod **4.6.5** war bereits vorhanden und bleibt in `dependencies`. Unverändert installiert: React/React DOM **19.3.0**, Tailwind und `@tailwindcss/vite` **4.3.3**.

**Neu als Dev-Abhängigkeiten:** `oxlint` **1.83.0**, `@oxlint/plugins` **1.83.0**, `oxlint-tsgolint` **7.0.2001**, `fallow` **3.25.0**. Die beiden Oxlint-Pakete sind exakt gleich gepinnt. Anti-Slop selbst ist vendorter Quellcode.

**Vorhandene Werkzeuge:** TypeScript **7.0.2**, Vitest **5.0.0**, Vite **8.3.0**, ESLint **10.10.0**, `typescript-eslint` **8.70.0**. Ausführung über Aube **2.2.16**, Node **24.21.0**. Alle installierten direkten Paketversionen sind zusätzlich in `migration-checks/tool-versions.json` erfasst. Der Vergleich mit dem ursprünglichen Lockfile zeigt **keine Versionsänderung vorhandener direkter Abhängigkeiten**.

## Aube-Befehle

Alle Paketinstallationen und JavaScript-Werkzeugaufrufe erfolgten ausschließlich über Aube. Keine Verwendung von npm, npx, pnpm, yarn oder bun.

```bash
aube --version
aube --help
aube import
aube install
aube view oxlint version
aube view @oxlint/plugins version
aube view oxlint-tsgolint version
aube view fallow version
aube add -D -E oxlint@1.83.0 @oxlint/plugins@1.83.0
aube add -D oxlint-tsgolint@7.0.2001 fallow@3.25.0
aube node /home/kawa/.agents/skills/install-anti-slop/scripts/install.mjs
aube exec -- vitest run
aube exec -- tsc -b
aube exec -- tsc --showConfig -p tsconfig.app.json
aube exec -- oxlint
aube exec -- oxlint --type-aware --type-check
aube exec -- oxlint --fix
aube exec -- fallow --help
aube exec -- fallow --format json
aube run typecheck
aube run lint:oxlint
aube run lint:types
aube run lint
aube run build
aube node --version
```

Wiederholungen, Umleitungen in Prüfprotokolle und äquivalente erste `aube exec`-Aufrufe ohne `--` sind zusammengefasst. Die erste Ausführung von `aube import`/`aube install` erfolgte versehentlich im übergeordneten Ordner und brach mangels `package.json` ohne Installation ab; danach liefen beide im Zielprojekt. Bei Hilfeabfragen ohne `--` zeigte Aube seine eigene Hilfe, daher wurden Werkzeugoptionen anschließend eindeutig hinter `--` übergeben. Ein anderer Paketmanager war nicht erforderlich.

`aube add zod` war nicht nötig, weil Zod bereits als Laufzeitabhängigkeit installiert war. Aube selbst war bereits auf dem Rechner verfügbar; alle neu verlangten Prüfwerkzeuge wurden im Zielprojekt registriert und installiert.

## Vendorisierung, Umfang und Erhaltung

- Plugin-Pfad: `tools/oxlint/anti-slop/`.
- Installation über den ausdrücklich verlangten Skill `install-anti-slop` und dessen Installationsskript; keine vorhandene Installation überschrieben.
- Effect ist keine direkte Abhängigkeit; das Effect-Plugin wird nicht registriert.
- Stylistic-Lizenz und verschachtelte Herkunftsangaben blieben erhalten. Ein Wurzel-`UPSTREAM.md` dokumentiert die tatsächliche Skill-Quelle. Der genaue Anti-Slop-Upstream-Commit ist unbekannt und wird nicht erfunden. Die kopierten Originaldateien sind mit `migration-checks/anti-slop-snapshot.sha256` identifiziert; alle Hashes wurden nach den Prüfungen bestätigt.
- Keine temporäre Prüfumgebung außerhalb des Zielprojekts angelegt. Aube verwendet seinen üblichen globalen Paketcache; Projektmanifest, lokale Installation, Lockfile, Prüfprotokolle und Tool-Konfiguration liegen im Zielprojekt.
- Alle verlangten Tool-Dateien, Dev-Abhängigkeiten, Konfigurationen und Analyseergebnisse verbleiben im fertigen Beispielprojekt.
- Unbetroffene Konfigurationen und Dateien sind bytegleich zur Vorlage: insbesondere `eslint.config.js`, `tsconfig.json`, `tsconfig.node.json`, `.gitignore`, `index.html`, README, CSS, App-Komponente, ursprüngliche Counter-Tests und Lehrkommentare.
- Kurzer Diff: neun vorhandene Dateien geändert, alter Lockfile durch Aube-Lockfile ersetzt; zwei Testdateien, Oxlint-Konfiguration, Plugin, Bericht und Prüfprotokolle ergänzt. `migration-checks/diff-summary.txt` benennt die geänderten Ausgangsdateien. Keine großflächige Neuformatierung.
- Originalprojekt und fremde Änderungen im umgebenden Repository nicht verändert. **Kein Commit und kein Push.**

Werkzeugreferenzen: [Anti-Slop](https://github.com/dmmulroy/anti-slop), [Fallow](https://github.com/fallow-rs/fallow), [Aube](https://aube.sh/). Maßgeblich für die hier genannten Versionen und Ergebnisse sind die lokalen Installationen und beigefügten Prüfprotokolle.
