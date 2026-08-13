import { Link } from 'react-router';

import { useTheme } from '../../contexts/ThemeContext';
import Button from './Button';

const DestinationCard = ({ title, image, text, slug }) => {
  // const theme = useContext(ThemeContext);
  const { theme } = useTheme();

  return (
    <div data-theme={theme} className='card bg-base-100 shadow-md'>
      <figure>
        <img src={image} alt='Tokyo' className='h-48 w-full object-cover' />
      </figure>
      <div className='card-body'>
        <Link to={`/destinations/${slug}`}>
          <h2 className='card-title hover:text-primary text-lg font-semibold'>{title}</h2>
        </Link>
        <p>{text}</p>
        <div className='card-actions justify-end'>
          <Button>Hey!?</Button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
