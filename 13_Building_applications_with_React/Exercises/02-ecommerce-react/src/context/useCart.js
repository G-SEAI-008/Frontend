import { use } from 'react';

import CartContext from './CartContext';

const useCart = () => use(CartContext);

export default useCart;
