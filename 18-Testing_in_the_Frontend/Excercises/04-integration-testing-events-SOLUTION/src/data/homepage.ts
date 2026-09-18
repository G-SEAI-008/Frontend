import type { LoaderFunction } from 'react-router';

import { CountResponseSchema } from '../schemas/api';

const API_URL = import.meta.env.VITE_EVENTS_API_URL;

export const getHomePageData: LoaderFunction = async (): Promise<{
  userCount: number;
  eventsCount: number;
}> => {
  if (!API_URL) {
    throw new Error(
      'Something tells me you forgot to set the VITE_EVENTS_API_URL environment variable.',
    );
  }
  const usersPromise = fetch(`${API_URL}/users`);
  const eventsPromise = fetch(`${API_URL}/events`);
  const [resUsers, resEvents] = await Promise.all([usersPromise, eventsPromise]);
  if (!resUsers.ok || !resEvents.ok) {
    throw new Error('Failed to fetch data');
  }
  const usersJson: unknown = await resUsers.json();
  const eventsJson: unknown = await resEvents.json();
  const users = CountResponseSchema.parse(usersJson);
  const events = CountResponseSchema.parse(eventsJson);
  return { userCount: users.totalCount, eventsCount: events.totalCount };
};
