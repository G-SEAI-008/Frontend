// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für die Lernbeispiele.
import { fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { events } from '../../test-utils/fixtures';
import { renderApp } from '../../test-utils/renderApp';

// jsdom berechnet keinen Viewport. Automatisches Scrollen wird hier nicht simuliert.
class TestIntersectionObserver {
  observe() {}
  disconnect() {}
}

describe('events: Liste und echte Leaflet-Karte', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockResolvedValue(Response.json(events)));
    vi.stubGlobal('IntersectionObserver', TestIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('lädt Events, reagiert auf die Auswahl und öffnet die Markierung', async () => {
    renderApp('/events');
    const card = await screen.findByRole('button', { name: 'React Meetup' });

    expect(card).toHaveTextContent('Berlin');
    fireEvent.click(card);
    fireEvent.click(screen.getByRole('button', { name: 'Marker' }));

    expect(screen.getAllByRole('heading', { name: 'React Meetup' })).toHaveLength(2);
    expect(fetch).toHaveBeenCalledExactlyOnceWith(
      'http://localhost:3001/api/events?page=1&limit=10',
    );
  });
});
