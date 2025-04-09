import React from "react";
import { Navigate } from "react-router-dom";
// import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  //   const { isAuthenticated } = useSelector((state:any) => state.auth);
  const isAuthenticated = true; // Replace with actual authentication logic
  return isAuthenticated ? children : null;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
