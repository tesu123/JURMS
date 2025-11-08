import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const isLoggedIn = useSelector((state) => state.auth.status);
  // if logged in, send them to dashboard
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
