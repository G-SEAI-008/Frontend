import { useEffect, useReducer } from 'react';

import CartContext from './CartContext';

const getInitialCart = () => JSON.parse(localStorage.getItem('cart')) || [];

const cartReducer = (cart, action) => {
  const { product } = action;
  const productInCart = cart.find((item) => item.id === product?.id);

  switch (action.type) {
    case 'ADD': {
      if (!productInCart) {
        return [...cart, { ...product, quantity: 1 }];
      }

      return cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    }

    case 'REMOVE': {
      if (productInCart.quantity === 1) {
        return cart.filter((item) => item.id !== product.id);
      }

      return cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item,
      );
    }

    case 'RESET': {
      return [];
    }

    default: {
      return cart;
    }
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart);

  useEffect(() => {
    if (cart.length === 0) {
      localStorage.removeItem('cart');
    } else {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => dispatch({ type: 'ADD', product });
  const removeFromCart = (product) => dispatch({ type: 'REMOVE', product });
  const resetCart = () => dispatch({ type: 'RESET' });

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
