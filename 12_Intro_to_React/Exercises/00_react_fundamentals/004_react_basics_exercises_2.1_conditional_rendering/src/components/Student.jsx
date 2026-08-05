import Grade from './Grade';

// oxlint-disable arrow-body-style
const Student = ({
  studentData: { picture, firstName, lastName, age, city, course, gpa, graduate },
}) => {
  return (
    <article className={`card ${graduate ? 'card-graduate' : ''}`}>
      <img className='card-image' src={picture} alt='' />
      <div className='card-body'>
        <h2>
          {firstName} {lastName}
        </h2>
        <p>Age: {age}</p>
        <p>City: {city}</p>
        <p>Course: {course}</p>
        <Grade gpa={gpa} />
        <p>Status: {graduate ? 'Alumnus' : 'Student'}</p>
      </div>
    </article>
  );
};
export default Student;
