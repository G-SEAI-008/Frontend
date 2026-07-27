function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.summary = function summary() {
  return `Title: ${this.title}, Author: ${this.author}, Pages: ${
    this.pages
  }, Read: ${this.isRead ? 'Yes' : 'No'}`;
};

const myBook = new Book('To Kill a Mockingbird', 'Harper Lee', 281, true);

console.log(myBook.summary());
// Output: Title: To Kill a Mockingbird, Author: Harper Lee, Pages: 281, Read: Yes
