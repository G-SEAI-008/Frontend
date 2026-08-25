type Destination = {
  id: number;
  slug: string;
  title: string;
  image: string;
  description: string;
};

type DestinationsOutletContext = {
  destinations: Destination[];
};

export type { Destination, DestinationsOutletContext };
