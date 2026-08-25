import { useOutletContext, useParams } from 'react-router';

import type { DestinationsOutletContext } from '../types';
import NotFound from './NotFound';

const SingleDestination = () => {
  const { slug } = useParams();
  const { destinations } = useOutletContext<DestinationsOutletContext>();

  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return <NotFound />;
  }

  return (
    <div className='mx-auto max-w-4xl space-y-6 px-4'>
      <h1 className='text-primary text-center text-4xl font-bold'>{destination.title}</h1>
      <img
        src={destination.image}
        alt={destination.title}
        className='rounded-box h-80 w-full object-cover shadow-md'
      />
      <p className='text-lg'>{destination.description}</p>
    </div>
  );
};

export default SingleDestination;
