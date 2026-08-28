export const formatPrice = (price: number) => (price === 0 ? 'Free' : `${price.toFixed(2)} €`);

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
};

export const truncate = (text: string, maxLength: number) =>
  text.length <= maxLength ? text : `${text.slice(0, maxLength).trimEnd()}...`;
