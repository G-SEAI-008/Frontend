import { useEffect, useState } from 'react';

import EventList from '../components/EventList';
import { useFavorites } from '../contexts/FavoritesContext';
import { getEvents } from '../data/events';
import type { EventItem } from '../types';

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error('Failed to load events:', error);
      }
    };

    void loadEvents();
  }, []);

  const favoriteEvents = events.filter((event) => favorites.includes(event.id));

  return (
    <>
      <h2>Your favorites</h2>
      <EventList events={favoriteEvents} emptyMessage='You have not starred any event yet.' />
    </>
  );
};

export default FavoritesPage;
