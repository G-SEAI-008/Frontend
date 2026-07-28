// # Use `setTimeout` to schedule the creation of a DOM element that displays a promotion message styled with Tailwind CSS.

const messageContainer = document.querySelector('#message-container');

// * Step 1: Use `setTimeout` to schedule the creation of a promotion message after 3 seconds.
setTimeout(() => {
  // * Step 2: Create a new DOM element (e.g., a `<div>`) for the promotion message.
  const promotionMessage = document.createElement('div');
  // * Step 3: Add some text to the promotion message, like "Special Offer: Get 20% off your next purchase!".
  promotionMessage.textContent = 'Special Offer: Get 20% off your next purchase!';
  // * Step 4: Use Tailwind CSS to style the message with a background color, padding, rounded corners, and centered text.
  promotionMessage.className = 'max-w-md mx-auto p-4 bg-red-300 rounded-lg shadow-lg';

  // * Step 5: Append the new element to the `message-container` div.
  messageContainer.append(promotionMessage);
}, 3000);
