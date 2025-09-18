import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (location.pathname === '/' || location.pathname.startsWith('/auth')) {
    return <Outlet />;
  }

  if (!isLoggedIn) {
    return <Navigate to='/auth' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
