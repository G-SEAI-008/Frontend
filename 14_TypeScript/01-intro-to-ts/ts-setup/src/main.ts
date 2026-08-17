// oxlint-disable no-unused-vars
// num = "Not anymore!";

// num.forEach((element) => {
//   console.log(element);
// });

// # Major Primitive Types in TypeScript
// string
let myString = "This is a string";
myString = "A different string";

// ! Literal type : "I cannot be changed"
const constString = "I cannot be changed";
// constString = "I cannot be changed";

// number
let num = 6;
// boolean
let bool = false;
const constBool = false;
// null
let nullVar: null = null;
// undefined
let undef: undefined;

// * Additional Primitive Types in TypeScript
// any
let anything: any = "This can be reassigned";
anything = 42;

// ! Explicit typing -> Man schreibt expliziet hin, was für ein Type mit ": type"
// ! Implicit typing (Type inference) -> TypeScript leitet sich selbst her, was für ein type die Variable ist

// # Functions
// function shout(spoken: string): string {
// return spoken.toUpperCase();
// }

const shout = (spoken: string): string => {
  return spoken.toUpperCase();
};

console.log(shout("Hey, how are you?"));
// // console.log(shout(42));

console.log("Sanity check");

// ! type void = Rückgabewert der Funktion wird nicht verwendet
const print = (content: any): void => {
  console.log(content);
};

print(shout("Hey, how are you?"));

const isOldEnough = (age: number): string => {
  if (age >= 18) {
    return "You are old enough";
  } else {
    return "You are not old enough";
  }
};

let templateLiteral: string = `Here is an example ${67}`;

const logMessage = (message: string, userId?: number): void => {
  console.log(`${message} ${userId ? `From user ${userId}` : ""}`);
};

logMessage("Hello there!");
logMessage("SomeThing", 6);

const greetUser = (name: string = "guest"): string => {
  return `Welcome, ${name}`;
};

console.log(greetUser());
console.log(greetUser("Ada"));
