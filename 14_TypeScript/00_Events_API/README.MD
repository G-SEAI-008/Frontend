# Event-App mit React, API und Authentication

In diesem Projekt baut ihr eine **Event-App mit React**.

für dieses Projekt bekommt ihr eine fertige **Events API**, die ihr lokal auf eurem Computer starten müsst.

Die API ist dokumentiert, und ihr könnt die Endpoints auch über **Swagger**, **Postman** oder **Insomnia** testen.

Das Ziel ist, dass ihr nicht mehr nur mit `localStorage` oder fertigen APIs arbeitet, sondern mit einer echten **REST API**, die Daten erstellen, lesen, aktualisieren und löschen kann.

Diese Aktionen nennt man **CRUD**:

| Aktion | Bedeutung           | HTTP Method |
| ------ | ------------------- | ----------- |
| Create | Daten erstellen     | `POST`      |
| Read   | Daten lesen         | `GET`       |
| Update | Daten aktualisieren | `PUT`       |
| Delete | Daten löschen       | `DELETE`    |

---

## Was soll die App können?

Auf der **Home Page** sollt ihr Events von der API holen:

```js
GET / api / events;
```

Diese Events werden dann als Cards angezeigt.

Die Events sollen chronologisch sortiert werden

Wenn man auf eine Event Card klickt, soll man zur Detailseite weitergeleitet werden: (React Router)

```txt
/events/:id
```

1
Auf der Detailseite holt ihr dann die Daten für ein einzelnes Event:

```js
GET /api/events/:id
```

Dort zeigt ihr alle wichtigen Informationen zum Event an.

---

## Sign-Up und Sign-In

Die App braucht auch Authentication.

Auf der **Sign-Up Page** erstellt der User einen Account:

```js
POST / api / users;
```

Wenn das erfolgreich ist, wird der User zur Sign-In Page weitergeleitet.

Auf der **Sign-In Page** loggt sich der User ein:

```js
POST / api / auth / login;
```

Wenn der Login erfolgreich ist, bekommt ihr von der API einen Token zurück.

Diesen Token speichert ihr in `localStorage`.

Zum Beispiel:

```js
localStorage.setItem('token', token);
```

Damit kann die App auch nach einem Page Reload noch wissen, dass der User eingeloggt ist.

---

## Protected Routes

Ein wichtiger Teil des Projekts sind **protected routes**.

Zum Beispiel soll nicht jeder User einfach die Seite **Create Event** öffnen können.

Nur eingeloggte User dürfen dort hin.

Dafür könnt ihr einen `ProtectedLayout` oder eine ähnliche Komponente bauen.

Die Idee ist:

```txt
Wenn der User eingeloggt ist:
  zeige die geschützte Seite

Wenn der User nicht eingeloggt ist:
  leite ihn zur Login-Seite weiter
```

In React Router macht man das zum Beispiel mit:

```jsx
<Navigate to='/login' />
```

und

```jsx
<Outlet />
```

`Outlet` bedeutet: Hier wird die Child Route angezeigt.

---

## Beispiel: Protected Layout

```jsx
import { Navigate, Outlet } from 'react-router';

const ProtectedLayout = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to='/signin' />;
};

export default ProtectedLayout;
```

Dieses Layout kann dann für geschützte Routes verwendet werden.

Zum Beispiel:

```jsx
<Route element={<ProtectedLayout isAuthenticated={isAuthenticated} />}>
  <Route path='/create-event' element={<CreateEventPage />} />
</Route>
```

---

## Create Event

Es soll auch eine Seite geben, auf der eingeloggte User ein neues Event erstellen können.

Dafür sendet ihr einen Request:

```js
POST / api / events;
```

Wichtig: Dieser Request braucht den Token im Header.

Zum Beispiel:

```js
headers: {
  Authorization: `Bearer ${token}`;
}
```

Ohne diesen Authorization Header wird die API den Request ablehnen.

Deshalb müsst ihr beim Fetch automatisch den gespeicherten Token aus `localStorage` holen und in den Request Header einfügen.

---

## Token aus localStorage lesen

Zum Beispiel:

```js
const token = localStorage.getItem('token');
```

Dann kann der Token in den Request eingefügt werden:

```js
fetch('/api/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(newEvent),
});
```

---

## React Router

Ihr sollt React Router verwenden.

Mögliche Routes sind zum Beispiel:

```txt
/                 → Home Page mit Event-Liste
/events/:id       → Event Details Page
/signup           → Registration Page
/signin           → Login Page
/create-event     → Protected Create Event Page
```

Die `create-event` Route sollte geschützt sein.

---

## React Hooks

Ihr werdet in diesem Projekt viel mit React Hooks arbeiten:

- `useState` für UI State
- `useEffect` für API Requests
- eventuell Context für Auth State
- React Router Hooks für Navigation und Parameter

Zum Beispiel könnt ihr mit `useEffect` Events laden, wenn die Home Page gerendert wird.

```jsx
useEffect(() => {
  const fetchEvents = async () => {
    const response = await fetch('/api/events');
    const data = await response.json();

    setEvents(data);
  };

  fetchEvents();
}, []);
```

---

## Styling

Für das Styling verwendet ihr **Tailwind CSS**.

Optional könnt ihr auch **DaisyUI** verwenden.

Die App soll responsive sein.

---

## Deployment

Am Ende soll die React App gebaut und als statische Seite deployed werden, zum Beispiel auf **Render**.

Wichtig:

Die API läuft in der Entwicklung lokal.

Für das Frontend-Deployment müsst ihr darauf achten, wie eure API URL konfiguriert ist.

---

## Planung

Bevor ihr mit Code startet, sollt ihr zuerst planen.

Zum Beispiel:

- Welche Pages braucht die App?
- Welche Components braucht ihr?
- Wie sieht das Layout aus?
- Welche Routes braucht ihr?
- Wer macht welche Aufgabe?
- Wie funktioniert der Auth Flow?

---

## Summary

Ihr baut eine **React + Vite Event-App**, die mit einer lokalen REST API kommuniziert.

Die App kann:

- Events anzeigen
- Event Details anzeigen
- User registrieren
- User einloggen
- Token in `localStorage` speichern
- geschützte Routes verwenden
- eingeloggten Usern erlauben, neue Events zu erstellen
- Fehler anzeigen

```txt
React + React Router + localStorage + API Requests + Authentication + Protected Routes
```
