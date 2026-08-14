/* eslint-disable react-refresh/only-export-components */
import { createContext, use, useReducer } from 'react';

const BookingContext = createContext();

// setItems(prev () => ({..prev, items: data}))
// setIsFull(...)
// setIsLoading(prev () => ({...prev, loading: true}))
// setError(...)

// dispatch({type: "fetch_start"})
// dispatch({type: "fetch_success", payload: data })
// dispatch({type: "fetch_error", payload: error})

const initalState = {
  destinations: [],
  premium: false,
};

const reducer = (bookingState, action) => {
  // console.log({ bookingState, action });

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
      throw new Error(`Unkown action type: ${action.type}`);
    }
  }
};

const BookingContextProvider = ({ children }) => {
  const [bookingState, dispatch] = useReducer(reducer, initalState);
  // console.log(bookingState);

  const addDestination = (destinationSlug) => {
    dispatch({ type: 'ADD_BOOKING', payload: destinationSlug });
  };

  const removeDestination = (destinationSlug) => {
    dispatch({ type: 'REMOVE_DESTINATION', payload: destinationSlug });
  };

  return (
    <BookingContext value={{ bookingState, addDestination, removeDestination }}>
      {children}
    </BookingContext>
  );
};

const useBooking = () => use(BookingContext);

export default BookingContextProvider;
export { useBooking };
