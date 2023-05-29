import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (!isAuthenticated && !loading) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default AuthRoute;
