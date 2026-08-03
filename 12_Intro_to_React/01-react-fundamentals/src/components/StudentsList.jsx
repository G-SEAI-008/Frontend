// oxlint-disable arrow-body-style
const StudentsList = () => {
  const students = [
    { id: 1, name: 'Eric', country: 'Germany' },
    { id: 10, name: 'Elias', country: 'Germany' },
    { id: 2, name: 'Renke', country: 'Germany' },
    { id: 3, name: 'Marco', country: 'Island' },
    { id: 5, name: 'Daniel', country: 'Germany' },
    { id: 7, name: 'Christopher', country: 'Germany' },
    { id: 8, name: 'Muju', country: 'Spain' },
    { id: 6, name: 'Niko', country: 'Czech Republic' },
    { id: 9, name: 'Kevin', country: 'Italia' },
  ];

  return (
    <ul>
      {/* {students[0].name} from {students[0].country} */}
      {students.map(({ id, name, country }) => {
        return (
          <li key={id}>
            {name} from {country}
          </li>
        );
      })}
    </ul>
  );
};
export default StudentsList;
