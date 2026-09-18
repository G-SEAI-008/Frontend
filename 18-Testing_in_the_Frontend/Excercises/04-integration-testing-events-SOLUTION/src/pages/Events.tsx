import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useLoaderData, useFetcher } from 'react-router';

import { EventsList, EventsMarkers, MapBounds, PanOnHover } from '@/components';
// oxlint-disable react/set-state-in-effect react/no-deriving-state-in-effects -- Das Starter-Muster übernimmt Router-Daten in die nachladbare Liste.
import type { Event, EventsResponse } from '@/types';

import 'leaflet/dist/leaflet.css';

const Events = () => {
  const initialData = useLoaderData<EventsResponse>();
  const fetcher = useFetcher<EventsResponse>();
  const [allEvents, setAllEvents] = useState(initialData.results);
  const [currentPage, setCurrentPage] = useState(initialData.currentPage);
  const [hasNextPage, setHasNextPage] = useState(initialData.hasNextPage);
  const [highlightedEvent, setHighlightedEvent] = useState<Event | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreEvents();
        }
      },
      { threshold: 0.1 },
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [loadMoreEvents]);

  return (
    <>
      <title>Upcoming Events</title>
      <div className='my-3 flex flex-col justify-between gap-5 md:flex-row'>
        <div className='w-full overflow-y-auto p-4 md:w-2/5'>
          <h1 className='p-4 text-2xl font-bold'>Upcoming Events</h1>
          <div className='grid grid-cols-2 gap-4'>
            <EventsList events={allEvents} setHighlightedEvent={setHighlightedEvent} />
            <div ref={observerRef} className='h-4' />
          </div>
          {fetcher.state === 'loading' && (
            <div className='flex w-full items-center justify-center'>
              <span className='loading loading-ring loading-xl text-primary' />
            </div>
          )}
        </div>
        <div className='sticky top-20 hidden h-[870px] overflow-hidden rounded-2xl md:block md:w-3/5'>
          <MapContainer center={[52.52, 13.405]} zoom={13} className='h-full'>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <MapBounds events={allEvents} />
            <PanOnHover event={highlightedEvent} />
            <EventsMarkers events={allEvents} />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Events;
