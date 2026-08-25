import { Link } from 'react-router';

import { useBooking } from '../../contexts/BookingContext';
import { useTheme } from '../../contexts/ThemeContext';
import type { Destination } from '../../types';

const DestinationCard = ({ title, image, description, slug }: Omit<Destination, 'id'>) => {
  const { theme } = useTheme();
  const { bookingState, addDestination, removeDestination } = useBooking();

  const isBooked = bookingState.destinations.includes(slug);

  const handleClick = () => {
    if (isBooked) {
      removeDestination(slug);
    } else {
      addDestination(slug);
    }
  };

  return (
    <div data-theme={theme} className='card bg-base-100 shadow-md'>
      <figure>
        <img src={image} alt={title} className='h-48 w-full object-cover' />
      </figure>
      <div className='card-body'>
        <Link to={`/destinations/${slug}`}>
          <h2 className='card-title hover:text-primary text-lg font-semibold'>{title}</h2>
        </Link>
        <p>{description}</p>
        <div className='card-actions justify-end'>
          <button onClick={handleClick} className={`btn ${isBooked ? 'btn-error' : 'btn-primary'}`}>
            {isBooked ? 'Unbook' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
