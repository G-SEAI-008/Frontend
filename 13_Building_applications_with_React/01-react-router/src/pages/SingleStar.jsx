import { Link, useOutletContext, useParams } from 'react-router';

function SingleStar() {
  const { slug } = useParams();
  const stars = useOutletContext();

  if (!stars) {
    return <p className='message--loading'>Loading...</p>;
  }

  const star = stars?.find((s) => s.slug === slug);

  if (!star) {
    return <h1>Not Found</h1>;
  }

  return (
    star && (
      // Link für Client-Side Navigation zurück zur Startseite
      <Link to='/' className='star'>
        <img src={star.url} alt={star.heading} className='star__img' />
        <h1 className='star__heading'>{star.heading}</h1>
        <p className='star__description'>{star.description}</p>
      </Link>
    )
  );
}
export default SingleStar;
