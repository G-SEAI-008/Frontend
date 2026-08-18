import { Navigate, Outlet } from 'react-router';

const ProtectedLayout = () => {
  const token = localStorage.getItem('token');

  return token ? <Outlet /> : <Navigate to='/login' replace />;
};
export default ProtectedLayout;
