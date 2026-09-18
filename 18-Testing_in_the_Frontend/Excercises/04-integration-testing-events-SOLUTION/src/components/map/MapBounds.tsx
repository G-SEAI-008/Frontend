import type { LatLngTuple } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import type { Event } from '@/types';

const MapBounds = ({ events }: { events: Event[] }) => {
  const map = useMap();

  useEffect(() => {
    const bounds: LatLngTuple[] = events.map((event) => [event.latitude, event.longitude]);
    if (bounds.length > 0) {
      map.fitBounds(bounds);
    }
  }, [map, events]);

  return null;
};

export default MapBounds;
