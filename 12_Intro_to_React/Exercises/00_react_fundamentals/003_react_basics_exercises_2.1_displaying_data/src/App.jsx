import Student from './components/Student';

import './index.css';

const studentData = {
  id: 1,
  firstName: 'Testy',
  lastName: 'McTestFace',
  age: 42,
  course: 'Software Engineer',
  city: 'Berlin',
  picture: 'https://randomuser.me/api/portraits/men/1.jpg',
};

const App = () => (
  <>
    <Student studentData={studentData} />
    {/* <Student {...studentData} /> */}
    {/* <Student firstName={studentData.firstName} lastName={studentData.lastName} /> */}
  </>
);

export default App;
