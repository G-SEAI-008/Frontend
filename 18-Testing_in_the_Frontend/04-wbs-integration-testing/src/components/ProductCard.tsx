import { useCart } from '@/context';
import type { CartItem } from '@/types';

const intl = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
});

const ProductCard = ({ item }: { item: CartItem }) => {
  const { id, name, image, price } = item;
  const { addItem } = useCart();

  return (
    <article className='card bg-base-100 w-56 shadow-xl'>
      <figure>
        <img src={image} alt={name} className='h-48 w-full object-cover' />
      </figure>
      <div className='card-body'>
        <h3 className='card-title'>{name}</h3>
        <p className='text-lg font-semibold'>{intl.format(price)}</p>
        <div className='card-actions justify-end'>
          <button
            className='btn btn-primary'
            aria-label={`add ${name}`}
            onClick={() => {
              addItem({ id, name, image, price });
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
