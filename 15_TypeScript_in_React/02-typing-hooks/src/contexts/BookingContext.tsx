import { createContext, use, useReducer } from 'react';
import type { ReactNode } from 'react';

type BookingState = {
  destinations: string[];
  premium: boolean;
};

type BookingAction =
  | {
      type: 'ADD_BOOKING';
      payload: string;
    }
  | {
      type: 'REMOVE_DESTINATION';
      payload: string;
    };

type BookingContextValue = {
  bookingState: BookingState;
  addDestination: (destinationSlug: string) => void;
  removeDestination: (destinationSlug: string) => void;
};

type BookingContextProviderProps = {
  children: ReactNode;
};

const BookingContext = createContext<BookingContextValue | null>(null);

const initialState: BookingState = {
  destinations: [],
  premium: false,
};
// const initialState = {
//   destinations: [],
//   premium: false,
// } satisfies BookingState;

const reducer = (bookingState: BookingState, action: BookingAction): BookingState => {
  switch (action.type) {
    case 'ADD_BOOKING': {
      if (bookingState.destinations.includes(action.payload)) {
        return bookingState;
      }
      const newDestinations = [...bookingState.destinations, action.payload];
      const premium = newDestinations.length >= 3;

      return {
        ...bookingState,
        destinations: newDestinations,
        premium,
      };
    }
    case 'REMOVE_DESTINATION': {
      const newDestinations = bookingState.destinations.filter((d) => d !== action.payload);
      const premium = newDestinations.length >= 3;

      return { ...bookingState, destinations: newDestinations, premium };
    }

    default: {
      throw new Error('Unknown action type');
    }
  }
};

const BookingContextProvider = ({ children }: BookingContextProviderProps) => {
  const [bookingState, dispatch] = useReducer(reducer, initialState);

  const addDestination = (destinationSlug: string) => {
    dispatch({ type: 'ADD_BOOKING', payload: destinationSlug });
  };

  const removeDestination = (destinationSlug: string) => {
    dispatch({ type: 'REMOVE_DESTINATION', payload: destinationSlug });
  };

  return (
    <BookingContext value={{ bookingState, addDestination, removeDestination }}>
      {children}
    </BookingContext>
  );
};

const useBooking = () => {
  const context = use(BookingContext);

  if (!context) {
    throw new Error('useBooking must be used inside BookingContextProvider');
  }

  return context;
};

export default BookingContextProvider;
export { useBooking };
