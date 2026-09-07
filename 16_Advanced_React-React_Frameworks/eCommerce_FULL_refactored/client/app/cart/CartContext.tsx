'use client';

import { createContext, use, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { z } from 'zod';

import { ProductSchema } from '@/lib/products';
import type { Product } from '@/lib/products';

const CART_KEY = 'cart';

const CartItemSchema = ProductSchema.extend({
  quantity: z.number().int().positive(),
});
const CartSchema = z.array(CartItemSchema);

type CartItem = z.infer<typeof CartItemSchema>;

type CartContextValue = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  changeQuantity: (id: number, change: number) => void;
  clearCart: () => void;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<CartContextValue | null>(null);

const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    let savedCart: unknown;

    try {
      savedCart = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
    } catch {
      localStorage.removeItem(CART_KEY);
      throw new Error('The saved cart contains invalid JSON.');
    }

    const { success, data, error } = CartSchema.safeParse(savedCart);

    if (!success) {
      localStorage.removeItem(CART_KEY);
      throw new Error(`Invalid saved cart:\n${z.prettifyError(error)}`);
    }

    // localStorage is only available after this client component mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(data);
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    const updatedCart = existingItem
      ? cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      : [...cart, { ...product, quantity: 1 }];

    saveCart(updatedCart);
  };

  const changeQuantity = (id: number, change: number) => {
    const updatedCart = cart
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity + change } : item))
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return (
    <CartContext value={{ cart, addToCart, changeQuantity, clearCart }}>{children}</CartContext>
  );
};

const useCart = (): CartContextValue => {
  const context = use(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider.');
  }

  return context;
};

export { CartProvider, useCart };
