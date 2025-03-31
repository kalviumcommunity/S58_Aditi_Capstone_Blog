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
  return children;
};

export default PrivateRoute;
