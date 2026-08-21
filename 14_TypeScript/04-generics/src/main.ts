// oxlint-disable typescript/array-type no-unused-vars typescript/ban-types typescript/no-unnecessary-type-parameters typescript/no-confusing-void-expression typescript/prefer-readonly-parameter-types typescript/no-unsafe-return typescript/no-unsafe-type-assertion

// const stringArray: string[] = ['1', '2', '3', '4'];
const stringArray: Array<string> = ['1', '2', '3', '4'];

// # Generic Functions
// # Generic Type Alias

// fetch('https://duckpond-89zn.onrender.com/wild-ducks');

const fetchData = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error('Fetch failed');
  }

  return res.json();
};

type Movie = {
  id: number;
  original_title: string;
  poster_path: string;
};
// # Generic Type Alias

type ApiResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTQxYjQyOWE1Yjc5Y2NlNWU5ZDVlOGRkN2I1ZTBiZiIsIm5iZiI6MTc1MjA1NTI0My40MDYwMDAxLCJzdWIiOiI2ODZlM2RjYjQwMjcyOTQ2MTY1MWVhZWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mOYov4BfVmQENUBBXFhVELz6GnVTfGZPsIN4ZVBjDvk',
  },
};

const tmdbResponse = await fetchData<ApiResponse<Movie>>(
  'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
  options,
);

tmdbResponse.results.forEach((movie) => {
  console.log(movie.original_title);
});

// fetchData<Duck[]>()

type JsonRes = {
  id: number;
  title: string;
  userId: number;
  body: string;
};

const jsons = await fetchData<JsonRes[]>('https://jsonplaceholder.typicode.com/posts');
// const ducks = await fetchData<Ducks[]>('https://duckpond.com/wild-ducks');

// jsons.forEach((json) => console.log(json.title, json.body));

// * localStorage

type DiaryEntry = {
  title: string;
  url: string;
  createdAt: string;
};

const getFromLocalStorage = <T>(key: string): T | null => {
  const raw = localStorage.getItem(key);

  if (raw === null) {
    return null;
  }

  return JSON.parse(raw);
};

const diaryEntry = getFromLocalStorage<DiaryEntry[]>('diary');
// const currentTheme = getFromLocalStorage<Theme[]>('theme');

const getFromLocalStorageOrThrow = <T>(key: string) => {
  const raw = localStorage.getItem(key);

  if (raw === null) {
    throw new Error(`Missing localStorage value for "${key}"`);
  }

  return JSON.parse(raw) as T;
};

// # Constrains / Einschränkungen mit `extends`

type LengthWise = {
  length: number;
};

const logLength = <T extends LengthWise>(value: T) => {
  console.log(value.length);
};

logLength('45');
logLength([1, 2, 3, 4]);
logLength({ name: 'Sally', length: 4 });
// logLength({ name: 'Sally' });
// logLength(3);

const logLengthUnkown = (value: unknown) => {
  if (
    typeof value === 'string' ||
    Array.isArray(value) ||
    (typeof value === 'object' && value !== null && 'length' in value)
  ) {
    console.log(value.length);
  }
};

// # Default Types / Standardtypen

type ApiResponse2<T, U = string> = {
  status: number;
  data: T;
  message?: U;
};

// # Mehrere Types in einem Generic verwenden

const makeTuple = <T, U>(item1: T, item2: U): [T, U] => [item1, item2];

const myTuple = makeTuple<number, string>(3, 'Jimmy');

// # Der `object` Type im Vergleich zu `{}`
// * unkown → Akzeptiert alles, verlangt von uns aber eine Type-Prüfung
// * {} → wie `unkown`, welches zusätzlich noch `null` und `undefined` ausschließt
// * `object` → deckt alle nicht primitive types ab
const makeTupleArray = <T extends object>(obj: T) => Object.entries(obj);

// console.log(typeof {}); // "object"
// console.log(typeof []); // "object"

// * Alternative: No arrays, but just {} → Objects
const makeTupleArrayOnlyObjects = <T extends Record<string, unknown>>(obj: T) => {
  if (Object.keys(obj).length === 0) {
    console.log('Das Objekt ist leer');
    return [];
  }

  return Object.entries(obj);
};

const myObj = {
  a: 'some string',
  b: 'another string',
};

console.log(makeTupleArray(myObj));
console.log(makeTupleArray({}));
// console.log(makeTupleArray(42));
// console.log(makeTupleArray('string'));
// console.log(makeTupleArray(null));
// console.log(makeTupleArray(undefined));
// console.log(makeTupleArray([0, 1, 2, 3, 4]));
// console.log(makeTupleArray([]));

// ? Was ist mit nur Arrays und keine Objects?

const logArray = <T>(array: T[]): void => {
  if (array.length === 0) {
    console.log('Das Array ist leer');
  } else {
    console.log(array);
  }
};

// console.log(logArray(myObj));
console.log(logArray([]));

// # `keyof`
type SomeObject = {
  a: string;
  b: number;
};

type SomeObjectKeys = keyof SomeObject;
// type SomeObjectKeys = "a" | "b";

const someKey: SomeObjectKeys = 'a';
