import Student from './components/Student';

import './index.css';

// Download the template to get started
const studentData = {
  firstName: 'Testy',
  lastName: 'McTestFace',
  age: 43,
  course: 'Web Development',
  city: 'Berlin',
  picture: 'https://randomuser.me/api/portraits/men/1.jpg',
  gpa: 90001,
  graduate: true,
};

const App = () => {
  // if (studentData.firstName !== 'Ruby') {
  //   return null;
  // }

  if (studentData.age === 42) {
    return <p>Don't panic.</p>;
  }

  return (
    <>
      <Student studentData={studentData} />
      {/* {studentData.firstName === 'Testy' ? <p>Ist wahr</p> : <details>Ist falsch</details>} */}
    </>
  );
};

export default App;
