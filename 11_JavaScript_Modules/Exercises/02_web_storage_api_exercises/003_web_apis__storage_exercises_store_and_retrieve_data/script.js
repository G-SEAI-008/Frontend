// Get elements from DOM
const form = document.querySelector('form');
const ul = document.querySelector('ul');
const reload = document.querySelector('#reload');

// Add event listener
form.addEventListener('submit', (e) => {
  // Prevent default to avoid reload of page
  e.preventDefault();
  // Check input has a value
  const userInput = e.target.elements.userInput.value;
  if (!userInput) {
    return alert('Please enter something before submitting');
  }
  // Get previous content from localStorage: key name "myQuotes"
  const myQuotes = JSON.parse(localStorage.getItem('myQuotes')) || [];
  // Addig quote to DOM
  const li = document.createElement('li');
  li.textContent = userInput;
  ul.before(li, ul.firstElementChild);
  // Adding quote to localStorage
  myQuotes.unshift(userInput);
  localStorage.setItem('myQuotes', JSON.stringify(myQuotes));
  // Reset form
  e.target.reset();
});
// Reload event
reload.addEventListener('click', () => {
  globalThis.location.reload();
});

// Read and load data
window.addEventListener('load', () => {
  // Get previous content from localStorage: key name "myQuotes"
  const myQuotes = JSON.parse(localStorage.getItem('myQuotes')) || [];

  myQuotes.forEach((q) => {
    // Addig quote to DOM
    const li = document.createElement('li');
    li.textContent = q;
    ul.append(li);
  });
});
