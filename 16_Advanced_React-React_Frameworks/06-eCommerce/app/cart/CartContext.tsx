'use client';

import { createContext, use, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { z } from 'zod';

import { ProductSchema } from '@/lib/products';
import type { Product } from '@/lib/products';

const CART_KEY = 'cart';

// Ein CartItem ist ein Produkt mit einer zusätzlichen Menge.
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

  // Warenkorb laden:
  // 1. Den gespeicherten JSON-String beim ersten Rendern im Browser lesen.
  // 2. Kaputtes JSON entfernen und einen verständlichen Fehler werfen.
  // 3. Die gelesenen Daten mit Zod prüfen.
  // 4. Gültige Daten in den React State übernehmen.
  useEffect(() => {
    // oxlint-disable-next-line init-declarations
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

    // localStorage ist erst nach dem Mounten im Browser verfügbar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(data);
  }, []);

  // saveCart:
  // 1. Den React State aktualisieren.
  // 2. Denselben Warenkorb im Local Storage speichern.
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  };

  // addToCart:
  // 1. Prüfen, ob das Produkt schon im Warenkorb liegt.
  // 2. Falls ja: seine Menge um 1 erhöhen.
  // 3. Falls nein: das Produkt mit quantity: 1 ergänzen.
  // 4. Den neuen Warenkorb im State und Local Storage speichern.
  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    const updatedCart = existingItem
      ? cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      : [...cart, { ...product, quantity: 1 }];

    saveCart(updatedCart);
  };

  // changeQuantity:
  // 1. Das Produkt über seine ID finden.
  // 2. Seine Menge um change erhöhen oder verringern.
  // 3. Produkte mit Menge 0 aus dem Warenkorb entfernen.
  // 4. Den neuen Warenkorb speichern.
  // Der Filter ersetzt eine eigene removeFromCart-Funktion.
  const changeQuantity = (id: number, change: number) => {
    const updatedCart = cart
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity + change } : item))
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  };

  // clearCart:
  // Den React State und den Local Storage mit einem leeren Warenkorb überschreiben.
  const clearCart = () => {
    saveCart([]);
  };

  return (
    <CartContext value={{ cart, addToCart, changeQuantity, clearCart }}>{children}</CartContext>
  );
};

// useCart:
// 1. Den Cart Context lesen.
// 2. Eine verständliche Fehlermeldung werfen, wenn der Provider fehlt.
// 3. Den typisierten Context zurückgeben.
const useCart = (): CartContextValue => {
  const context = use(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider.');
  }

  return context;
};

export { CartProvider, useCart };
