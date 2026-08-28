import { Link } from 'react-router';

const NotFoundPage = () => (
  <div className='not-found'>
    <h2>404</h2>
    <p>That page does not exist.</p>
    <Link to='/'>Back to all events</Link>
  </div>
);

export default NotFoundPage;
