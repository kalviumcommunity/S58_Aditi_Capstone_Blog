<<<<<<< HEAD
import { Navigate } from "react-router-dom";

/**
 * A wrapper component to protect routes that require authentication.
 * Redirects to /login if the user is not authenticated.
 */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // 🛑 No token? Kick user to login
    return <Navigate to="/login" replace />;
  }

  // ✅ Token exists — allow access
=======
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "./auth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  if (!isLoggedIn()) {
    // redirect back to where user tried to go, after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
  return children;
};

export default PrivateRoute;
