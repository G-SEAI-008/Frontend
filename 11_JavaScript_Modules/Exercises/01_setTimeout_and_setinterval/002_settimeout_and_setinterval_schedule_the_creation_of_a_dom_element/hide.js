const messageContainer = document.querySelector('#message-container');
const promotionMessage = document.createElement('div');
promotionMessage.textContent = 'Special Offer: Get 20% off your next purchase!';
promotionMessage.className = 'max-w-md mx-auto p-4 bg-red-300 rounded-lg shadow-lg';
promotionMessage.classList.add('hidden');
messageContainer.append(promotionMessage);

function showPromotion() {
  promotionMessage.classList.remove('hidden');
  console.log('Promotion ist jetzt sichtbar!');
}

function hidePromotion() {
  promotionMessage.classList.add('hidden');
  console.log('Promotion ist jetzt versteckt!');
}

setTimeout(showPromotion, 3000);

setTimeout(hidePromotion, 10_000);
