// oxlint-disable typescript/ban-ts-comment no-shadow no-unused-vars
// TYPESCRIPT FUNCTION CARDIO
// # 1
function multiply(a, b) {
    return a * b;
}
multiply(2, 5); // 10
//@ts-expect-error
multiply('2', true);
// # 2
function greet(person) {
    return `Hello ${person}`;
}
greet('Steve'); // Hello Steve
//@ts-expect-error
greet({ id: 1, name: 'Steve' });
// # 3
const user = {
    firstName: 'Karl',
    lastName: 'Karlsen',
    email: 'karl@example.com',
};
function getWelcomeMessage(user) {
    return `Welcome, ${user.firstName} ${user.lastName}`;
}
getWelcomeMessage(user); // "Welcome, Karl Karlsen"
//@ts-expect-error
getWelcomeMessage({ firstName: 'Alan' });
// # 4
function isEven(num) {
    return num % 2 === 0;
}
isEven(4); //true
//@ts-expect-error
isEven('4');
//@ts-expect-error
const result = isEven(5);
//don't remove this line - workaround for 'ts-expect-error bug'
console.log(result);
// # 5
function getFirstElementofStringArray(arr) {
    return arr[0];
}
getFirstElementofStringArray(['a', 'b', 'c', 'd']); //"a"
// console.log('test', getFirstElementofStringArray([])); // undefined
//@ts-expect-error
getFirstElementofStringArray([1, 2, 3, 4]);
// # 6
function sumOfNumbers(number) {
    return number.reduce((sum, current) => sum + current, 0);
}
sumOfNumbers([1, 2, 3, 4]); // 10
// sumOfNumbers([]);
//@ts-expect-error
sumOfNumbers(['1', '2', '3']);
// # 7 - Tuple
function getProductInfo(product) {
    return `Product: ${product[0]}, Price: $${product[1]}`;
}
getProductInfo(['Laptop', 1200]); // "Product: Laptop, Price: $1200"
//@ts-expect-error
getProductInfo([1200, 'Laptop']);
//@ts-expect-error
getProductInfo(['Keyboard']);
// # 8
function formatUserInput(input) {
    return `User said ${input}`;
}
formatUserInput('hello'); // "User said hello"
formatUserInput(12_434); // "User said 1243"
//@ts-expect-error
const output = formatUserInput(400);
//don't remove this line - workaround for 'ts-expect-error bug'
console.log(output);
function fetchUserData(id) {
    return { id, name: `User ${id}` };
}
fetchUserData(123); // id: 123, name: "User 123"
//@ts-expect-error
fetchUserData('aa1123b');
// # 10
// type Rectangle = { base: number; height: number };
// function getWidth({ base, height }: Rectangle) {}
function getWidth({ base, height }) {
    return base * height;
}
getWidth({ base: 2, height: 1 });
//@ts-expect-error
getWidth({ base: 100, height: 50, pi: 220, e: 120 });
function handleResponse(response) {
    return `Status: ${response[0]}, Body: "${response[1]}"`;
}
handleResponse([200, 'OK']);
handleResponse([404, 'Not Found']);
//@ts-expect-error
handleResponse([500]);
//@ts-expect-error
handleResponse('I am a teapot');
// # 12
function logValue(input) {
    console.log(input);
}
logValue('hello');
logValue(42);
logValue(false);
//@ts-expect-error
logValue({ value: 'no' });
async function fetchData(url) {
    return `Data from ${url}`;
}
// How do we need to change this line to make this work?
// const data: ApiData = await fetchData('/api/user');
// const stringArray: string[]
// const stringArray2: Array<String>
const getData = async () => {
    const data = await fetchData('/api/user');
    console.log(data);
};
getData();
export {};
