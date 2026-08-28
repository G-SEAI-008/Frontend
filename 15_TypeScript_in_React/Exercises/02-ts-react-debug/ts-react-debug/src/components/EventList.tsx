import type { EventItem } from '../types';
import EventCard from './EventCard';

interface EventListProps {
  events: EventItem[];
  emptyMessage?: string;
}

const EventList = ({ events, emptyMessage = 'Nothing to show here.' }: EventListProps) => {
  if (events.length === 0) {
    return <p className='empty'>{emptyMessage}</p>;
  }

  return (
    <div className='event-list'>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
