import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaShare } from 'react-icons/fa';
// oxlint-disable max-lines-per-function shadcn/no-inline-styles -- Statische Starter-Seite; für die Testübung unverändert lassen.
import { Link, useLoaderData } from 'react-router';

const Home = () => {
  const { userCount, eventsCount } = useLoaderData<{
    userCount: number;
    eventsCount: number;
  }>();

  return (
    <div className='bg-base-100 min-h-screen'>
      <div className='hero bg-base-200 relative min-h-screen overflow-hidden'>
        <div
          className='absolute inset-0'
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        <div className='hero-content text-neutral-content relative z-10 text-center'>
          <div className='max-w-md'>
            <h1 className='mb-5 text-5xl font-bold text-white drop-shadow-lg'>Welcome to Venued</h1>
            <p className='mb-5 text-lg text-white drop-shadow-md'>
              Create unforgettable experiences and share amazing events with your community. From
              intimate gatherings to grand celebrations, make every moment count.
            </p>
            <div className='flex flex-col justify-center gap-4 sm:flex-row'>
              <Link to='/events' className='btn btn-primary btn-lg'>
                Explore Events
              </Link>
              <Link
                to='/app'
                className='btn btn-outline btn-lg hover:text-primary border-white text-white hover:bg-white'
              >
                Create Event
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className='bg-base-100 py-20'>
        <div className='container mx-auto px-4'>
          <div className='mb-16 text-center'>
            <h2 className='text-base-content mb-4 text-4xl font-bold'>Why Choose Venued?</h2>
            <p className='text-base-content/70 mx-auto max-w-2xl text-xl'>
              Everything you need to create, manage, and share incredible events
            </p>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
            <div className='card bg-base-200 shadow-xl'>
              <div className='card-body items-center text-center'>
                <FaCalendarAlt className='text-primary mb-4 text-4xl' />
                <h3 className='card-title'>Easy Planning</h3>
                <p>Create and organize events with our intuitive planning tools</p>
              </div>
            </div>
            <div className='card bg-base-200 shadow-xl'>
              <div className='card-body items-center text-center'>
                <FaUsers className='text-secondary mb-4 text-4xl' />
                <h3 className='card-title'>Community Driven</h3>
                <p>Connect with like-minded people and build lasting relationships</p>
              </div>
            </div>
            <div className='card bg-base-200 shadow-xl'>
              <div className='card-body items-center text-center'>
                <FaMapMarkerAlt className='text-accent mb-4 text-4xl' />
                <h3 className='card-title'>Location Mapping</h3>
                <p>Interactive maps to help attendees find your events easily</p>
              </div>
            </div>
            <div className='card bg-base-200 shadow-xl'>
              <div className='card-body items-center text-center'>
                <FaShare className='text-info mb-4 text-4xl' />
                <h3 className='card-title'>Easy Sharing</h3>
                <p>Share your events across social platforms with one click</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='from-primary to-secondary bg-gradient-to-r py-20'>
        <div className='container mx-auto px-4'>
          <div className='stats stats-vertical lg:stats-horizontal bg-base-100 w-full shadow-xl'>
            <div className='stat'>
              <div className='stat-figure text-primary'>
                <FaCalendarAlt className='text-3xl' />
              </div>
              <div className='stat-title'>Events Created</div>
              <div className='stat-value text-primary'>{eventsCount}</div>
            </div>
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                <FaUsers className='text-3xl' />
              </div>
              <div className='stat-title'>Active Users</div>
              <div className='stat-value text-secondary'>{userCount}</div>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-base-100 py-20'>
        <div className='container mx-auto px-4'>
          <div className='mb-16 text-center'>
            <h2 className='text-base-content mb-4 text-4xl font-bold'>What Our Users Say</h2>
          </div>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <div className='card bg-base-200 shadow-xl'>
              <div className='card-body'>
                <div className='mb-4 flex items-center'>
                  <div className='avatar'>
                    <div className='w-16 rounded-full'>
                      <img
                        src='https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
                        alt='User'
                      />
                    </div>
                  </div>
                  <div className='ml-4'>
                    <h4 className='font-bold'>Sarah Johnson</h4>
                    <p className='text-base-content/70 text-sm'>Event Organizer</p>
                  </div>
                </div>
                <p className='text-base-content/80'>
                  "Venued made organizing our company retreat so much easier. The interface is
                  intuitive and the mapping feature helped everyone find the venue!"
                </p>
              </div>
            </div>
            <div className='card bg-base-200 shadow-xl'>
              <div className='card-body'>
                <div className='mb-4 flex items-center'>
                  <div className='avatar'>
                    <div className='w-16 rounded-full'>
                      <img
                        src='https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
                        alt='User'
                      />
                    </div>
                  </div>
                  <div className='ml-4'>
                    <h4 className='font-bold'>Michael Chen</h4>
                    <p className='text-base-content/70 text-sm'>Community Leader</p>
                  </div>
                </div>
                <p className='text-base-content/80'>
                  "The community features are amazing! I've connected with so many people through
                  events I discovered on Venued."
                </p>
              </div>
            </div>
            <div className='card bg-base-200 shadow-xl'>
              <div className='card-body'>
                <div className='mb-4 flex items-center'>
                  <div className='avatar'>
                    <div className='w-16 rounded-full'>
                      <img
                        src='https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
                        alt='User'
                      />
                    </div>
                  </div>
                  <div className='ml-4'>
                    <h4 className='font-bold'>Emily Rodriguez</h4>
                    <p className='text-base-content/70 text-sm'>Wedding Planner</p>
                  </div>
                </div>
                <p className='text-base-content/80'>
                  "As a wedding planner, Venued has streamlined my workflow. My clients love how
                  easy it is to share event details with their guests."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className='from-primary to-secondary relative overflow-hidden bg-gradient-to-r py-20'
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className='relative z-10 container mx-auto px-4 text-center'>
          <h2 className='mb-4 text-4xl font-bold text-white'>Ready to Create Amazing Events?</h2>
          <p className='mx-auto mb-8 max-w-2xl text-xl text-white/90'>
            Join thousands of event creators who trust Venued to bring their vision to life. Start
            your journey today!
          </p>
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            <button className='btn btn-primary btn-lg'>Get Started Free</button>
            <Link
              to='/events'
              className='btn btn-outline btn-lg hover:text-primary border-white text-white hover:bg-white'
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
