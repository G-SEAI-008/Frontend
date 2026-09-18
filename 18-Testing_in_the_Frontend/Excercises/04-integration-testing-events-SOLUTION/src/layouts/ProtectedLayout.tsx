import { Navigate, Outlet } from 'react-router';

import { Loading } from '@/components';
import { useAuth } from '@/contexts';

const ProtectedLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return !loading && !isAuthenticated ? <Navigate to='/login' /> : <Outlet />;
};

export default ProtectedLayout;
