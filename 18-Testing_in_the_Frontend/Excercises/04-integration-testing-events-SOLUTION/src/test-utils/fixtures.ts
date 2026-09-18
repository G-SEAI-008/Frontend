export const user = { id: 1, name: 'Ada', email: 'ada@example.com' };
export const auth = { user, token: 'test-token' };
export const event = {
  id: 1,
  title: 'React Meetup',
  description: 'React gemeinsam lernen',
  date: '2026-10-01T18:00:00.000Z',
  location: 'Berlin',
  latitude: 52.52,
  longitude: 13.405,
  organizerId: 1,
  createdAt: '2026-09-01T12:00:00.000Z',
  updatedAt: '2026-09-01T12:00:00.000Z',
};
export const events = {
  results: [event],
  totalCount: 1,
  totalPages: 1,
  currentPage: 1,
  hasNextPage: false,
  hasPreviousPage: false,
};
