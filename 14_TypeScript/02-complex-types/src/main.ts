// oxlint-disable no-unused-vars

let greeting = 'hello'; // Typ: string
const fixedGreeting = 'Hello'; // Typ: "Hello"

// # Arrays
const string: string[] = ['hi', 'bye', 'what?'];
const nums: number[] = [1, 3, 4, 5, 6, 7];
// nums.push('4');
const bools: Array<boolean> = [true, false, false, true]; // ! Generic syntax
const bools2 = [true, false, false, true];

// ! union type
const mixed: (string | number)[] = [1, 'hi', 2, 'bye'];
const different: string | number[] = [1, 2, 3];

// # Tuples
const graphCoordinates: [number, number, number?] = [23, -3];
// graphCoordinates[0] = 'string';

// const [counter, setCounter] = useState(0)

// # Object types
// # Readonly
// # Type Aliases
// ! types aliases

type StringOrNumber = number | string;

type Person = {
  id: StringOrNumber;
  readonly name: string;
  age: number;
  city?: string;
};

const person: Person = {
  id: '485hfg-453',
  name: 'Steve',
  age: 72,
  city: 'Berlin',
};

const person2: Person = {
  id: 4,
  name: 'Reed',
  age: 43,
};

const people: Person[] = [];
people.push(person);
people.push(person2);
// people.push({ name: 'Susan' });

const whatever: any[] = [];
whatever.push(1);
whatever.push('hi');
whatever.push({ ok: true });

// Object.freeze() // -> bietet auch Laufzeitschutz
// person.name = 'Captain America';
person.age = 73;

console.log(person);

// ! Type narrowing

if (person.city) {
  console.log(person.city.toUpperCase());
} // checked truthy

// Oder:
// Short-circuit evaluation with logical AND
person.city && console.log(person.city.toUpperCase());
// checked truthy

// Oder:
console.log(person.city?.toUpperCase()); // ? checked auf `null` und `undefined`

// console.log(0 || 'Default'); // || checked auf `falsy`
// console.log(0 ?? 'Default'); // ?? checked auf `null` und `undefined`
// console.log(null || 'Default');
// console.log(null ?? 'Default');
// boolean ? true : false

// # Arrays aus Objects
// # Interfaces
// ! Interfaces

interface User {
  name: string;
}

interface User {
  age: number;
}

const mergedUsers: User[] = [
  { name: 'Ada', age: 36 },
  { name: 'Grace', age: 30 },
];

console.log(mergedUsers);

mergedUsers.forEach((user) => console.log(`${user.name} is ${user.age} years old.`));

type UserSettings = {
  theme: 'light' | 'dark';
  language: 'de' | 'en' | 'es';
};

type UserProfile = {
  name: string;
  settings: UserSettings;
};

// # Type Intersections
// ! Type Intersections
type DBEntry = {
  _id: string;
  createdAt: string;
};
type Role = 'admin' | 'user' | 'staff';

type DBUser = DBEntry & {
  name: string;
  email: string;
  password: string;
  role: Role;
};

const user: DBUser = {
  _id: '123sdf',
  name: 'Steve Rogers',
  email: 'captain@america.com',
  password: 'stevepass',
  createdAt: '2026-08-18',
  role: 'staff',
};

interface DBEntryInterface {
  _id: string;
  createdAt: string;
}

interface DBUserInterface extends DBEntryInterface {
  name: string;
  email: string;
  password: string;
}

const user2: DBUserInterface = {
  _id: '123sdf',
  name: 'Steve Rogers',
  email: 'captain@america.com',
  password: 'stevepass',
  createdAt: '2026-08-18',
};

// # Mapped Objects
// # Literal Unions
type Direction = 'left' | 'right' | 'up' | 'down';

// Example 1: Using in a variable
let move: Direction = 'up';

// Example 2: Function accepting a Direction
function movePlayer(direction: Direction) {
  console.log(`Player moves ${direction}`);
}

movePlayer('left'); // ✅
movePlayer('down'); // ✅
// movePlayer('forward'); // ❌ Error: Argument of type '"forward"' is not assignable to type 'Direction'

// Example 3: Switch statement with exhaustive checking
function handleDirection(dir: Direction) {
  switch (dir) {
    case 'left':
      console.log('Moving left');
      break;
    case 'right':
      console.log('Moving right');
      break;
    case 'up':
      console.log('Moving up');
      break;
    case 'down':
      console.log('Moving down');
      break;
    default:
      // TypeScript will warn if we forget a case
      const _exhaustiveCheck: never = dir;
      return _exhaustiveCheck;
    // console.log('Unkown direction');
  }
}

handleDirection('left');
// handleDirection('forward'); // ❌ Error: Argument of type '"forward"' is not assignable to type 'Direction'

// # Function types
type Calculation = (num1: number, num2: number) => number;

const add: Calculation = (a, b) => a + b;
const subtract: Calculation = (a, b) => a - b;

// oder inline
const multiply = (a: number, b: number): number => a * b;
const multiply2: Calculation = (a, b) => a * b;

const divide = (a: number, b: number): number => a / b;

// add('4', 5);
