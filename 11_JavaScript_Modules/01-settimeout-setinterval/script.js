const number = document.querySelector('#number');

// # Set Timeout

const callbackFunc = () => {
  console.log('Hello');
};

const milliseconds = 2000;

setTimeout(callbackFunc, milliseconds);

// setTimeout(() => {
//   console.log('Hello again');
//   setTimeout(() => {
//     console.log('Hello again inside setTimout');
//   }, 3000);
// }, 3000);

// setTimeout(() => {
//   console.log('Hello again!!!!!');
// }, 4000);

// # Set Interval
// setInterval(() => {
//   console.log('Bye');
// }, 2000);

// let count  = 0

const interval = setInterval(() => {
  number.textContent = Number(number.textContent) + 1;
}, 1000);

// parseInt
// parseFloat
// Number

clearTimeout();

setTimeout(() => {
  clearInterval(interval);
}, 10_000);

// # 10 Minuten
let sekunden = 10 * 60;

const timer = setInterval(() => {
  sekunden--;

  console.log(`${Math.floor(sekunden / 60)}:${sekunden % 60}`);

  if (sekunden === 0) {
    clearInterval(timer);
    console.log('Zeit ist abgelaufen!');
  }
}, 1000);

setTimeout(
  () => {
    clearInterval(timer);
  },
  10 * 60 * 1000,
);
