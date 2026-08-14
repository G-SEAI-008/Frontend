const API_URL = 'https://fakestoreapi.com';

const get = async (path) => {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`FakeStore request failed: ${response.status}`);
  }

  return response.json();
};

export const getCategories = () => get('/products/categories');

export const getProducts = () => get('/products');

export const getProductsByCategory = (category) =>
  get(`/products/category/${encodeURIComponent(category)}`);
