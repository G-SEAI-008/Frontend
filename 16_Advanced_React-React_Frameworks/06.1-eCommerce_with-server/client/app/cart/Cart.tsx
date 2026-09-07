'use client';

import Image from 'next/image';

import { useCart } from './CartContext';

const Cart = () => {
  const { cart, changeQuantity, clearCart } = useCart();

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <h1 className='mb-6 text-2xl font-bold'>Cart {itemCount > 0 && `(${itemCount})`}</h1>

      {cart.length === 0 ? (
        <p className='py-8 text-center'>Your cart is empty</p>
      ) : (
        <>
          <div>
            {cart.map((item) => (
              <div key={item.id} className='flex items-center gap-4 border-b py-4'>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className='size-20 object-contain'
                />

                <div className='grow'>
                  <p>{item.title}</p>
                  <p>${item.price.toFixed(2)}</p>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    aria-label={`Decrease quantity of ${item.title}`}
                    className='cursor-pointer border px-2'
                    onClick={() => {
                      changeQuantity(item.id, -1);
                    }}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type='button'
                    aria-label={`Increase quantity of ${item.title}`}
                    className='cursor-pointer border px-2'
                    onClick={() => {
                      changeQuantity(item.id, 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-8 text-right'>
            <p>Items: {itemCount}</p>
            <p className='font-bold'>Total: ${total.toFixed(2)}</p>
            <button
              type='button'
              className='button mt-4'
              onClick={() => {
                clearCart();
                globalThis.alert('Thank you for your order!');
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
