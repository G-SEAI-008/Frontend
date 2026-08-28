# Events SPA + TypeScript

This app works. Open it in the browser and you can search events, filter them by category, star your favorites and add a new one. Everything runs.

The build, on the other hand, does not.

The app was written without type annotations, so the TypeScript compiler has no idea what any of it means. Your job is to add the annotations until `npm run build` finishes without a single error.

## Setup

1. Clone this repo
2. `npm install`
3. `npm run dev`
4. Open the URL that Vite prints. The app should work

There is no API to set up and no `.env` file to create. The events come from `public/db.json`, which is fetched by `src/data/events.ts` exactly like a real API would be.

## Why does the app run if the types are broken?

Vite does not typecheck while you develop. It strips the types out and hands the JavaScript to the browser. The compiler only runs when you build. That is why a project can feel fine for weeks and then fall over the first time someone runs `npm run build`.

## The task

Run the build:

```bash
npm run build
```

Aaaaand it doesn't work. You will see something like `TS7006` here and `TS2345` over there, around sixty errors in total.

Do not panic at that number. There are roughly forty annotations to write, and one missing annotation often produces several errors. A single line in `src/contexts/FavoritesContext.tsx` is responsible for nine of them.

For a faster loop while you work, use:

```bash
npm run typecheck
```

Same errors, no bundling. The Problems panel in VS Code shows you the same thing live.

## Suggested order

The compiler lists errors alphabetically by file path, not by difficulty. Work through it in these four blocks instead. Each block only depends on the ones before it.

### Block 1: plain functions and simple components

- `src/utils/format.ts`
- `src/components/Badge.tsx`
- `src/components/Card.tsx`

Nothing React-specific except one prop type and `children`. Start here.

### Block 2: props

- `src/components/EventCard.tsx`
- `src/components/EventList.tsx`
- `src/components/CategoryFilter.tsx`
- `src/components/FavoriteButton.tsx`

Every component here needs a props type. Look at how each component is used by its parent to work out what the props are.

### Block 3: events, refs and forms

- `src/components/SearchBar.tsx`
- `src/components/EventForm.tsx`
- `src/layouts/RootLayout.tsx`

Event handler parameters and one `useRef`.

### Block 4: state, context and data

- `src/contexts/FavoritesContext.tsx`
- `src/data/events.ts`
- `src/pages/HomePage.tsx`
- `src/pages/EventDetailPage.tsx`
- `src/pages/FavoritesPage.tsx`

The hardest block. This is where `useState` needs to be told what it is holding.

Expect the error count to go **up** at some point. When you correctly type a component's props, the compiler can finally check the places that use that component, and it will find new problems there. That is progress, not a mistake.

## Types you have been given

`src/types.ts` already contains every domain type you need. You should not have to change that file. You do have to import from it and apply it.

| Type | What it is |
| --- | --- |
| `Category` | The four categories, as a union of string literals |
| `Filter` | A `Category`, or `'all'` |
| `EventItem` | One event, as it comes back from the data layer |
| `NewEvent` | An event that has not been saved yet, so it has no `id` |
| `FormState` | The shape of the create form while the user is typing |
| `FavoritesContextValue` | What the favorites context hands to its consumers |

## React types you will need

These come from React itself, not from `types.ts`:

| Situation | What to import and use |
| --- | --- |
| A component that wraps other content | `ReactNode` for the `children` prop |
| `onChange` on an `<input>` | `ChangeEvent<HTMLInputElement>` |
| `onChange` on a `<textarea>` | `ChangeEvent<HTMLTextAreaElement>` |
| `onSubmit` on a `<form>` | `FormEvent<HTMLFormElement>` |
| A ref pointing at an `<input>` | `useRef<HTMLInputElement>(null)` |

For `useState`, the type usually comes from the initial value. When the initial value is empty or `null`, there is nothing to infer from, so you have to say it yourself:

```ts
const [items, setItems] = useState<EventItem[]>([]);
const [selected, setSelected] = useState<EventItem | null>(null);
```

## Rules

- No `any`. ESLint is configured to reject it, so `npm run lint` will catch you
- No `// @ts-expect-error` and no `// @ts-ignore`. Same reason
- No `as` casts. There is a correct annotation for every error in this repo
- Do not edit `src/types.ts`
- Do not change what the app does. If the app behaves differently after your fix, the fix is wrong

## When an error message is confusing

**`Expected 0 arguments, but got 1` in `FavoriteButton.tsx`**
The functions come from the favorites context. Look at the default value the context was created with and ask yourself what TypeScript inferred those functions to be.

**`Property 'focus' does not exist on type 'never'`**
A `useRef` that was given `null` and nothing else. TypeScript concluded the ref will only ever hold `null`.

**`Property 'title' does not exist on type 'never'` in a page**
Same idea, different hook. A `useState` that started as `null` or `[]`.

**`Type 'EventItem[]' is missing the following properties from type 'EventItem'`**
Somebody wrote a return type that is not true. Read the message carefully: it is telling you it received an array where a single item was promised. Fix the annotation, not the code.

## Done

When `npm run build` prints no errors and `npm run lint` is clean, you are done. Then run `npm run dev` one more time and confirm the app still behaves exactly as it did at the start.

## Stretch goals

If you finish early:

1. Add a `sortBy` control on the home page with a `'date' | 'price'` union type
2. Give `Badge` an optional `size` prop typed as `'small' | 'large'`
3. Move the search and filter state into the URL with `useSearchParams`
4. Make `getEventById` throw instead of returning `undefined`, and handle it in the page
