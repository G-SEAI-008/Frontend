import { Link } from 'react-router';

import type { EventItem } from '../types';
import { formatDate, formatPrice, truncate } from '../utils/format';
import Badge from './Badge';
import FavoriteButton from './FavoriteButton';

const availability = (soldOut: boolean) => (soldOut ? 'Sold out' : 'Tickets available');

type EventCardProps = {
  event: EventItem;
  showDescription?: boolean;
};

const EventCard = ({ event, showDescription = true }: EventCardProps) => (
  <article className='event-card'>
    <img src={event.imageUrl} alt={event.title} />
    <div className='event-card-body'>
      <Badge category={event.category} />
      <h3>{event.title}</h3>
      {showDescription && <p>{truncate(event.description, 90)}</p>}
      <p className='meta'>
        {formatDate(event.date)} in {event.location}
      </p>
      <p className='meta'>{availability(event.soldOut)}</p>
      <footer>
        <span className='price'>{formatPrice(event.price)}</span>
        <FavoriteButton eventId={event.id} />
        <Link to={`/events/${event.id}`}>Details</Link>
      </footer>
    </div>
  </article>
);

export default EventCard;
