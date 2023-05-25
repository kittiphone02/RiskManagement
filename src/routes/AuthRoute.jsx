import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ auth: { isAuthenticated, loading }, children }) => {
  if (!isAuthenticated && !loading) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default AuthRoute;
