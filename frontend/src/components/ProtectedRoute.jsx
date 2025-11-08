// import React from "react";
// import { Outlet, Navigate } from "react-router-dom"; // <-- FIXED
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({}) => {
//   const isLoggedIn = useSelector((state) => state.auth.status);

//   if (!isLoggedIn) {
//     return <Navigate to="/login" />;
//   }
//   return <Outlet />;
// };

// export default ProtectedRoute;

import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const location = useLocation();

  if (!isLoggedIn) {
    // go to landing when not logged in; preserve where they tried to go
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
