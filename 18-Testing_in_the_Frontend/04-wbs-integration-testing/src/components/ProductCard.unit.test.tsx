// oxlint-disable vitest/prefer-expect-assertions
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, vi, afterEach, test } from 'vitest';

import { useCart } from '@/context'; // In tests, this will be the mocked version
import type { CartItem } from '@/types';

import ProductCard from './ProductCard';

// Mock the @/context module to provide a mocked useCart hook
vi.mock(import('@/context'), () => ({
  useCart: vi.fn<() => ReturnType<typeof useCart>>(),
}));

const mockUseCart = vi.mocked(useCart);

const mockAddItem = vi.fn<(item: CartItem) => void>();

// Helper function to render ProductCard with mocked addItem function
const renderProductCardWithMockedCart = (item: CartItem) => {
  mockUseCart.mockReturnValue({
    items: [],
    addItem: mockAddItem,
  });
  render(<ProductCard item={item} />);

  return mockAddItem;
};

describe('product Card', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const sampleItem = {
    id: 1,
    name: 'Test Product',
    image: 'test.jpg',
    price: 10.99,
  };

  test('should render product information correctly', () => {
    renderProductCardWithMockedCart(sampleItem);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('10,99 €')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'add Test Product' })).toBeInTheDocument();
  });

  test('should display image with correct src and alt attributes', () => {
    renderProductCardWithMockedCart(sampleItem);
    const image = screen.getByAltText('Test Product');
    expect(image).toHaveAttribute('src', 'test.jpg');
    expect(image).toHaveAttribute('alt', 'Test Product');
  });

  test('should format price correctly in German locale', () => {
    const expensiveItem = {
      id: 2,
      name: 'Expensive Product',
      image: 'expensive.jpg',
      price: 1234.56,
    };

    renderProductCardWithMockedCart(expensiveItem);
    expect(screen.getByText('1.234,56 €')).toBeInTheDocument();
  });

  test('should handle decimal prices correctly', () => {
    const decimalItem = {
      id: 3,
      name: 'Decimal Product',
      image: 'decimal.jpg',
      price: 9.99,
    };

    renderProductCardWithMockedCart(decimalItem);
    expect(screen.getByText('9,99 €')).toBeInTheDocument();
  });

  test('should handle zero price items', () => {
    const freeItem = {
      id: 4,
      name: 'Free Product',
      image: 'free.jpg',
      price: 0,
    };

    renderProductCardWithMockedCart(freeItem);
    expect(screen.getByText('0,00 €')).toBeInTheDocument();
  });

  test('should call addItem when add to cart button is clicked', () => {
    const addItemMock = renderProductCardWithMockedCart(sampleItem);
    const addButton = screen.getByRole('button', { name: 'add Test Product' });
    fireEvent.click(addButton);
    expect(addItemMock).toHaveBeenCalledExactlyOnceWith({
      id: 1,
      name: 'Test Product',
      image: 'test.jpg',
      price: 10.99,
    });
  });

  test('should call addItem multiple times when button is clicked multiple times', () => {
    const addItemMock = renderProductCardWithMockedCart(sampleItem);
    const addButton = screen.getByRole('button', { name: 'add Test Product' });
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(addItemMock).toHaveBeenCalledTimes(3);
  });

  test('should have correct CSS classes for card structure', () => {
    renderProductCardWithMockedCart(sampleItem);
    const article = screen.getByRole('article');
    expect(article).toHaveClass('card', 'w-56', 'bg-base-100', 'shadow-xl');
    const button = screen.getByRole('button', { name: 'add Test Product' });
    expect(button).toHaveClass('btn', 'btn-primary');
  });

  test('should have correct aria-label for accessibility', () => {
    renderProductCardWithMockedCart(sampleItem);
    const button = screen.getByRole('button', { name: 'add Test Product' });
    expect(button).toHaveAttribute('aria-label', 'add Test Product');
  });

  test('should handle special characters in product name', () => {
    const specialCharItem = {
      id: 6,
      name: 'Product with "quotes" & symbols!',
      image: 'special.jpg',
      price: 15.5,
    };

    renderProductCardWithMockedCart(specialCharItem);
    expect(screen.getByText('Product with "quotes" & symbols!')).toBeInTheDocument();
    expect(screen.getByAltText('Product with "quotes" & symbols!')).toBeInTheDocument();
  });

  test('should render card title with correct heading level', () => {
    renderProductCardWithMockedCart(sampleItem);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Test Product');
    expect(heading).toHaveClass('card-title');
  });
});
