// import React from "react";
// import { Outlet, Navigate } from "react-router-dom"; // <-- FIXED
// import { useSelector } from "react-redux";

// const PublicRoute = ({}) => {
//   const isLoggedIn = useSelector((state) => state.auth.status);

//   if (!isLoggedIn) {
//     return <Outlet />;
//   }

//   return <Navigate to={"/dashboard"} />;
// };

// export default PublicRoute;

import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.status);
  // if logged in, send them to dashboard
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
