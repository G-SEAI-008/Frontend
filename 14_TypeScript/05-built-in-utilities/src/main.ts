// oxlint-disable typescript/array-type no-unused-vars typescript/ban-types typescript/prefer-readonly-parameter-types

// # Partial<T>
// * Makes all properties in `T` optional.

type User = {
  password: string;
  name: string;
  email: string;
};

const validateUserForm = ({ name, email, password }: User) => {
  const newErrors: Partial<User> = {};

  //   Validierung der Inputs
  if (!name.trim()) {
    newErrors.name = 'Name is required';
  }
  if (!email.trim()) {
    newErrors.email = 'Email is required';
  }
  if (!password.trim()) {
    newErrors.password = 'Password is required';
  }

  return newErrors;
};

// # Utility Types kombinieren - Typeception

type Todo = {
  title: string;
  description: string;
  completed: boolean;
};

type TodoPreview = Readonly<Pick<Todo, 'title' | 'completed'>>;

const renderTodo = (todo: TodoPreview) => {
  console.log(todo.title, todo.completed);
  //   todo.completed = false;
};

// # `Readonly` im Vergleich zu `as const`

type SortSettings = Readonly<{
  sort: string;
  pageSize: number;
}>;

const settingsA: SortSettings = {
  sort: 'asdf',
  pageSize: 10,
};
// * Readonly → macht readonly

const settingsB = {
  sort: 'asdf',
  pageSize: 10,
} as const;
// * as const → macht 1. readonly & 2. literal type

// # Record
// Constructs an object type with keys of type K and values of type T.
type RoleAccess = Record<'admin' | 'user' | 'guest', boolean>;

const access: RoleAccess = {
  admin: true,
  user: true,
  guest: false,
};

// # Record, Arrays und object
// Record<string, unknown> erlaubt beliebige String-Schlüssel.
// Arrays haben in TypeScript einen Zahlen-Index und passen daher nicht dazu.

const arrayAsNumberRecord: Record<number, unknown> = ['a', 'b'];
// Record<number, unknown> erlaubt Zahlen-Schlüssel. Dazu passen Arrays,
// aber auch Objekte wie { 0: 'a' }.

// `T extends object` erlaubt alle nicht-primitiven Werte: Objekte, Arrays,
// Funktionen oder Date. Einen Zugriff mit value[0] garantiert es nicht.

// oxlint-disable-next-line typescript/consistent-indexed-object-style
// type Record<K extends PropertyKey, T> = { [P in K]: T };
