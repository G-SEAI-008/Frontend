// oxlint-disable arrow-body-style
import './Hero.css';

const Hero = () => {
  return (
    <section>
      <h2 className='hero__heading' style={{ cornerShape: 'bevel', borderRadius: '3rem' }}>
        Hero!
      </h2>
    </section>
  );
};
export default Hero;
