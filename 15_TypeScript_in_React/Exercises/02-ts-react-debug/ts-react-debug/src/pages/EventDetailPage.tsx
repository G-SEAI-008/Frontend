import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import Badge from '../components/Badge';
import Card from '../components/Card';
import FavoriteButton from '../components/FavoriteButton';
import { getEventById } from '../data/events';
import type { EventItem } from '../types';
import { formatDate, formatPrice } from '../utils/format';

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) {
      return;
    }

    const loadEvent = async () => {
      try {
        const found = await getEventById(Number(eventId));
        setEvent(found ?? null);
      } catch {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    void loadEvent();
  }, [eventId]);

  if (loading) {
    return <p className='empty'>Loading event...</p>;
  }
  if (!event) {
    return <p className='error'>We could not find that event.</p>;
  }

  return (
    <Card title={event.title}>
      <img src={event.imageUrl} alt={event.title} />
      <Badge category={event.category} />
      <p>{event.description}</p>
      <p className='meta'>
        {formatDate(event.date)} in {event.location}
      </p>
      <p className='price'>{formatPrice(event.price)}</p>
      <FavoriteButton eventId={event.id} />
      <Link to='/'>Back to all events</Link>
    </Card>
  );
};

export default EventDetailPage;
