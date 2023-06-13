import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import privateRoutes from "../constants/privateRoutes";

// Import Components
import PrivateRoute from "./PrivateRoute";
import Login from "../Pages/auth/Login";
import Dashboard from "../Pages/dashboard/Dashboard";
import NotFound from "../common/NotFound";
// import Setting from "../pages/setting";
import AuthRoute from "./AuthRoute";
import Layout from "../Components/layouts/RootLayout";
const Routing = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <Routes>
    <Route path="/auth" element={<Login />} />
  
    <Route
      path="/"
      element={
        <Layout>
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        </Layout>
      }
    />
    
    <Route path="*" element={<NotFound />} />
  
    {privateRoutes.map(({ Component, path, permission }, index) => (
      <Route
        key={index}
        path={path}
        element={
          <Layout>
            <PrivateRoute auth={auth} permissions={permission}>
              <Component />
            </PrivateRoute>
          </Layout>
        }
      />
    ))}
  </Routes>
  
  );
};

export default Routing;



