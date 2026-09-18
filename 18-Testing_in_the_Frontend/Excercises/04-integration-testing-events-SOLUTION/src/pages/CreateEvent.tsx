import { useState, useEffect, useCallback, useRef } from 'react';
import { useLoaderData, useFetcher } from 'react-router';

import { CreateEventModal } from '@/components';
import { useAuth } from '@/contexts';
// oxlint-disable react/set-state-in-effect react/no-deriving-state-in-effects -- Das Starter-Muster übernimmt Router-Daten in die nachladbare Liste.
import type { EventsResponse } from '@/types';

const CreateEvent = () => {
  const initialData = useLoaderData<EventsResponse>();
  const fetcher = useFetcher<EventsResponse>();
  const [allEvents, setAllEvents] = useState(initialData.results);
  const [currentPage, setCurrentPage] = useState(initialData.currentPage);
  const [hasNextPage, setHasNextPage] = useState(initialData.hasNextPage);
  const { user } = useAuth();
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    setAllEvents(initialData.results);
    setCurrentPage(initialData.currentPage);
    setHasNextPage(initialData.hasNextPage);
  }, [initialData]);

  const handleCreateEventClick = () => {
    modalRef.current?.showModal();
  };

  const loadMoreEvents = useCallback(() => {
    if (fetcher.state === 'loading' || !hasNextPage) {
      return;
    }
    void fetcher.load(`/events?page=${currentPage + 1}&limit=10`);
  }, [currentPage, hasNextPage, fetcher]);

  useEffect(() => {
    if (fetcher.data && fetcher.state === 'idle') {
      const fetchedData = fetcher.data;
      setAllEvents((prev) => [...prev, ...fetchedData.results]);
      setCurrentPage(fetchedData.currentPage);
      setHasNextPage(fetchedData.hasNextPage);
    }
  }, [fetcher.data, fetcher.state]);

  const eventsByUser = allEvents.filter((event) => event.organizerId === user?.id);

  return (
    <div className='container mx-auto p-4'>
      <div>Welcome back, {user?.name ?? user?.email}!</div>
      <div>
        <div className='mb-4 flex items-center justify-between'>
          <h2>Your Events ({eventsByUser.length})</h2>
          <div className='flex gap-2'>
            <button className='btn btn-primary' onClick={handleCreateEventClick}>
              Create New Event
            </button>
            {hasNextPage && eventsByUser.length > 0 ? (
              <button
                onClick={loadMoreEvents}
                disabled={fetcher.state === 'loading'}
                className='btn btn-secondary'
              >
                {fetcher.state === 'loading' ? 'Loading...' : 'Load More Events'}
              </button>
            ) : null}
          </div>
        </div>
        {eventsByUser.length === 0 ? (
          <p>You haven't created any events yet.</p>
        ) : (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            {eventsByUser.map((event) => (
              <div key={event.id} className='card bg-base-100 shadow-xl'>
                <div className='card-body'>
                  <h3 className='card-title'>{event.title}</h3>
                  <p>{event.description}</p>
                  <p>
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <CreateEventModal modalRef={modalRef} />
    </div>
  );
};
export default CreateEvent;
