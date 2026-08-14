# eCommerce React – vereinfachte Lehrversion

Diese Kopie zeigt eine kleine vollständige React-Anwendung mit demselben Design und denselben Funktionen wie das Ausgangsprojekt.

## Starten

```bash
npm install
npm run dev
```

## Enthaltene React-Themen

- React Router mit Layout und drei Seiten
- `useState` und `useEffect` für Daten aus der FakeStore API
- Context und `useReducer` für den globalen Warenkorb
- Persistenz des Warenkorbs in `localStorage`
- wiederverwendbare Komponenten
- Tailwind CSS und DaisyUI
- `@/`-Imports und Barrel Files

## Struktur

```text
src/
├── api/          # alle Zugriffe auf die FakeStore API
├── components/   # wiederverwendbare UI-Bausteine
├── context/      # Warenkorb-State und Aktionen
├── layouts/      # gemeinsames Seiten-Layout
├── pages/        # Komponenten für die Routen
└── utils/        # kleine Hilfsfunktionen
```

Die FakeStore API wird ausschließlich in `src/api/fakeStore.js` angesprochen. Falls sich ihre URLs oder Antworten später ändern, gibt es damit nur eine zentrale Stelle zum Anpassen.
