import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  auth: { isAuthenticated, user, loading },
  permissions,
  children,
}) => {
  if (!isAuthenticated && !loading) {
    return <Navigate to="/auth" />;
  }

  const isAllowed = permissions.some((role) => role === user?.role);

  if (!isAllowed && !loading) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
