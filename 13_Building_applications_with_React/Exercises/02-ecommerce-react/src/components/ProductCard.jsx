import { Link } from 'react-router';

import { useCart } from '@/context';

const ProductCard = ({ product }) => {
  const { addToCart, cart, removeFromCart } = useCart();
  const productInCart = cart.find((p) => p.id === product.id);

  return (
    <div className='card bg-base-100 shadow-xl'>
      <figure className='h-48 bg-white p-3'>
        <img src={product.image} alt={product.title} className='h-full w-full object-contain' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title truncate'>{product.title}</h2>
        <p>{product.price} € </p>
        <div className='card-actions items-center justify-end'>
          <Link
            to={`/category/${product.category}`}
            className='text-xs no-underline hover:underline'
          >
            More from {product.category}
          </Link>
          {productInCart ? (
            <div className='flex items-center justify-center gap-3'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => removeFromCart(product)}
              >
                -
              </button>
              <span> {productInCart.quantity}</span>
              <button type='button' className='btn btn-primary' onClick={() => addToCart(product)}>
                +
              </button>
            </div>
          ) : (
            <button type='button' className='btn btn-primary' onClick={() => addToCart(product)}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
