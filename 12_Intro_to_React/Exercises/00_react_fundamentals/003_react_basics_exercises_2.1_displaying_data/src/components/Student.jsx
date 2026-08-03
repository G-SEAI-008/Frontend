// oxlint-disable arrow-body-style
const Student = ({ chicken: { picture, firstName, lastName, age, city, course } }) => {
  // * Was wir bekommen als Prop
  //  {
  //   chicken: {
  //     id: 1,
  //     firstName: 'Testy',
  //     lastName: 'McTestFace',
  //     age: 42,
  //     course: 'Software Engineer',
  //     city: 'Berlin',
  //     picture: '...',
  //   },
  // }
  // const person = props.person;
  // const firstName = person.firstName
  // const lastName = person.lastName
  // const { firstName, lastName, picture, age, city, course } = person;

  return (
    <article className='card'>
      <img className='card-image' src={picture} alt='' />
      <div className='card-body'>
        <h2>
          {firstName} {lastName}
        </h2>
        <p>Age: {age}</p>
        <p>City: {city}</p>
        <p>Course: {course}</p>
      </div>
    </article>
  );
};
export default Student;
