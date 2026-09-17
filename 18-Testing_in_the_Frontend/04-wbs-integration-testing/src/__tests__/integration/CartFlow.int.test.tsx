// oxlint-disable vitest/prefer-expect-assertions
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { CartBadge, ProductCard } from '@/components';
import { CartProvider } from '@/context';
import type { CartItem } from '@/types';

describe('cart flow (integration)', () => {
  test('updates badge after adding an item', () => {
    // Arrange
    const item: CartItem = {
      id: 1,
      name: 'Test Product',
      image: 'test.avif',
      price: 19.99,
    };

    // render beide Komponenten
    render(
      <CartProvider>
        <CartBadge />
        <ProductCard item={item} />
      </CartProvider>,
    );

    const badge = screen.getByLabelText('cart-count');
    // expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent(/^Items in your cart: 0 and/u);

    // click add to cart in ProductCard
    fireEvent.click(screen.getByRole('button', { name: /add Test Product/iu }));

    // check das cartBadge Update
    expect(badge).toHaveTextContent(/^Items in your cart: 1 and/u);
  });
});
