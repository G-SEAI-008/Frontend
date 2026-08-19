// oxlint-disable no-unused-vars typescript/prefer-enum-initializers unicorn/prefer-spread no-throw-literal unicorn/prefer-ternary

// # Enums
enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

const move: Direction = Direction.Left;

function turnWithOutEnum(dir: string) {
  if (dir === 'Left') {
    console.log('Turning left');
  }
}

turnWithOutEnum('left');

function turnWithEnum(dir: Direction) {
  if (dir === Direction.Left) {
    console.log('Turning left');
  }
}

// turnWithEnum(Direction.Left);

// * Erasable Syntax
type Example = string;
const myStr: Example = 'String';

// # Literal Unions
type DirectionUnion = 'left' | 'right' | 'up' | 'down';

function turnWithLiteralUnion(dir: DirectionUnion) {
  if (dir === 'left') {
    console.log('Turning left');
  }
}

// turnWithLiteralUnion('left');

// # as const
const DirectionObj = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
} as const;

type DirectionKey = (typeof DirectionObj)[keyof typeof DirectionObj];

function moveTo(dir: DirectionKey) {
  console.log(dir);
}

// moveTo('left');

// # 📚 Type Narrowing

// * Truthiness Narrowing
const alertMe = (msg: string): void => {
  if (msg) {
    alert(msg);
  } else {
    alert('Did you forget why you wanted to be alerted?');
  }
};

// alertMe('');

function printLength(str?: string) {
  if (str) {
    // falsy ("", null, undefined, 0)
    str.split('');
  }
}

function printLength2(str?: string) {
  str?.split(''); // null, undefined
}

// * Equality Narrowing
const compare = (x: string | number, y: string | boolean) => {
  if (x === y) {
    console.log(x.toUpperCase());
  }
};

compare(4, '4');
compare(4, true);
compare('3', '3');
compare('3', '4');

// * Type Guards mit `typeof`
console.log(typeof false); // "boolean"
console.log(typeof 'I am a string!'); // "string"
console.log(typeof 35); // "number"

const printValue = (value: string | number) => {
  if (typeof value === 'string') {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
};

printValue(4);
printValue('test');

type MessageObject = { message: string };

function alertUser(value: string | MessageObject) {
  if (typeof value === 'string') {
    console.log(value.split(''));
  } else {
    console.log(value.message.split(''));
  }
}

// * Type Guards für Objekte

console.log(typeof { firstName: 'Bob' }); // "object"
console.log(typeof [1, 2, 3]); // "object"

console.log(Array.isArray({ firstName: 'Bob' })); // false
console.log(Array.isArray([1, 2, 3])); // true

// * Classes mit `instanceof` prüfen
const logDateOrString = (val: Date | string) => {
  if (val instanceof Date) {
    console.log(
      val.toLocaleString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    );
  } else {
    console.log(val.trim());
  }
};

logDateOrString('1983-12-24');
logDateOrString(new Date('1983-12-24'));

// * Error Handling
// # type unkown
// Die flexibilität von `any`, aber erhalten gleichzeitig type saftey
const throwSomething = (throwError: boolean) => {
  try {
    if (throwError) {
      // throw new TypeError('Wrong value type');
      throw new Error('This will be the message property', { cause: 'BAD_DATA' });
    } else {
      throw "This wouldn't have a message property, and would cause a runtime error if we try to access it";
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      console.error(error.cause);
    } else if (error instanceof TypeError) {
      console.error(error.message);
    } else {
      console.error(error);
      console.error('Default error message');
    }
  }
};

throwSomething(true);
throwSomething(false);

// # Der `in` Operator
// * Mit `in` auf ein Objekt-Property prüfen. gibt boolean zurück

type Dog = { bark: () => void };
type Cat = { meow: () => void };

type Pet = Dog | Cat;

function speak(pet: Pet) {
  if ('bark' in pet) {
    pet.bark();
  } else {
    pet.meow();
  }
}

const dog: Dog = { bark: () => console.log('Woof') };
const cat: Cat = { meow: () => console.log('Meow') };

speak(dog);
speak(cat);

function alertUsers(value: string | MessageObject) {
  // ? Prüfe value !== null, weil typeof null ebenfalls "object" ergibt.
  if (typeof value === 'object' && value !== null && 'message' in value) {
    console.log(value.message);
  } else {
    console.log(value);
  }
}
