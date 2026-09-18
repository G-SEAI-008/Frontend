import type { Dispatch, SetStateAction } from 'react';

import type { Event } from '@/types';

const EventsList = ({
  events,
  setHighlightedEvent,
}: {
  events: Event[];
  setHighlightedEvent: Dispatch<SetStateAction<Event | null>>;
}) => {
  return events.map((event) => (
    <button
      type='button'
      aria-label={event.title}
      key={event.id}
      className='card bg-base-100 cursor-pointer shadow-xl'
      onClick={() => {
        setHighlightedEvent(event);
      }}
    >
      <div className='card-body'>
        <h2 className='card-title'>{event.title}</h2>
        <p>{event.description}</p>
        <p>
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
      </div>
    </button>
  ));
};

export default EventsList;
