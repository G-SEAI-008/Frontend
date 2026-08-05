// oxlint-disable arrow-body-style
import Student from './components/Student';
import students from './data/students';

import './index.css';

const App = () => {
  return (
    <div className='container'>
      {students.map((singleStudent) => (
        <Student key={singleStudent.id} studentData={singleStudent} />
      ))}
    </div>
  );
};

export default App;
