// These types are given to you. You should not need to change anything in this file.
// Your job is to import them where they are needed and apply them.

export type Category = 'music' | 'sports' | 'tech' | 'food';

export type Filter = Category | 'all';

export interface EventItem {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  category: Category;
  price: number;
  imageUrl: string;
  soldOut: boolean;
}

// An event that has not been saved yet, so it has no id.
export type NewEvent = Omit<EventItem, 'id'>;

export interface FormState {
  title: string;
  description: string;
  date: string;
  location: string;
  category: Category;
  price: string;
}

export interface FavoritesContextValue {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}
