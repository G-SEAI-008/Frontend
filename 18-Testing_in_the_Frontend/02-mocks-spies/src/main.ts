import { calculateTotal } from './checkout';
import { CheckoutSchema } from './schemas/checkout';

import './style.css';

const priceInput = document.querySelector<HTMLInputElement>('#price')!;
const countrySelect = document.querySelector<HTMLSelectElement>('#country')!;
const calculateBtn = document.querySelector<HTMLButtonElement>('#calculate')!;
const totalDisplay = document.querySelector<HTMLParagraphElement>('#total')!;

calculateBtn.addEventListener('click', () => {
  if (!priceInput.reportValidity()) {
    totalDisplay.textContent = '';
    return;
  }

  const result = CheckoutSchema.safeParse({
    net: priceInput.valueAsNumber,
    country: countrySelect.value,
  });

  if (!result.success) {
    totalDisplay.textContent = 'Bitte einen gültigen Preis und ein gültiges Land auswählen.';
    return;
  }

  const { net, country } = result.data;
  const total = calculateTotal(net, country);
  totalDisplay.textContent = `Total: €${total.toFixed(2)}`;
});
