import { Alert, CartTable } from '@/components';
import { useCart } from '@/context';

const Cart = () => {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div className='mt-5'>
        <Alert message='Your cart is empty :(' />
      </div>
    );
  }

  return <CartTable />;
};

export default Cart;
