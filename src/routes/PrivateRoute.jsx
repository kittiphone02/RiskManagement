import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ permissions, children }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

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
