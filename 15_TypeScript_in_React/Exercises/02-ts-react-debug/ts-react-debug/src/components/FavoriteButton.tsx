import { useFavorites } from '../contexts/FavoritesContext';

type FavoriteButtonProps = {
  eventId: number;
};

const FavoriteButton = ({ eventId }: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(eventId);

  return (
    <button
      type='button'
      className={active ? 'fav active' : 'fav'}
      onClick={() => {
        toggleFavorite(eventId);
      }}
    >
      {active ? '★' : '☆'}
    </button>
  );
};

export default FavoriteButton;
