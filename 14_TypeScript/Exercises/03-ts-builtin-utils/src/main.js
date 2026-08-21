// oxlint-disable no-unused-vars
// ------------------------------------------
// Built-in Utility Types Practice
// ------------------------------------------
const draftUser = { name: 'Draft' };
// TODO: Create a variable `strictSettings` of type Required<Settings>
// and provide all the properties.
const strictSettings = { darkMode: true, fontSize: 16 };
// TODO: Use Readonly<Book> to make the book immutable.
// Try changing a property and see the error.
const book = { title: '1984', author: 'George Orwell' };
// book.title = 'Animal Farm'; // ❌ Should be a compile error
// console.log(book); // { title: 'Animal Farm', author: 'George Orwell' }
const colors = ['red', 'green', 'blue'];
// type BookAuthor = Book['author'];
// # 4. Record
// You’re building a key-value map of scores per user.
// Keys are usernames (string), values are numbers.
const obj = {
    0: 'item',
    1: 'another one',
};
// TODO: Use Record<string, number> to type this object
const scores = {
    alice: 42,
    bob: 36,
};
const contactInfo = { name: 'Grace', email: 'grace@example.com' };
// # 6. Omit
// Now do the reverse: remove the phone from Contact.
// TODO: Create a type ContactNoPhone using Omit
// Then try assigning a variable with a `phone` property and see the error.
const contactNoPhone = {
    id: 1,
    name: 'Alan',
    email: 'alan@example.com',
    // phone: "should not be allowed" // ❌
};
export {};
