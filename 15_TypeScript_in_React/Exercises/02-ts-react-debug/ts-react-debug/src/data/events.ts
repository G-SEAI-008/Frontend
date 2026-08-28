import type { EventItem } from '../types';

const BASE_URL = '/db.json';

export const getEvents = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error('Could not load the events');
  }
  const data = (await res.json()) as EventItem[];
  return data;
};

export const getEventById = async (id: number) => {
  const events = await getEvents();
  return events.find((event) => event.id === id);
};
