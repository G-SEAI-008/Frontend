import ProtectedLayout from './components/ProtectedLayout';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />}></Route>

      <Route element={<ProtectedLayout />}>
        <Route path='/events/new' element={<CreateEventPage />} />
      </Route>
    </Routes>
  );
};
export default App;
