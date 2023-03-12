import { string, bool, node } from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, redirectPath, children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  isAllowed: bool.isRequired,
  redirectPath: string,
  children: node,
};

ProtectedRoute.defaultProps = {
  redirectPath: '/',
  children: null,
};

export default ProtectedRoute;
