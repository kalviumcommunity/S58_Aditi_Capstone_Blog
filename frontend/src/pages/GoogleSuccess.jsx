import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token.trim()); // ✅ Trim to avoid hidden whitespaces
      navigate("/", { replace: true }); // ✅ Prevents back-nav to success URL
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return <p>Logging you in via Google...</p>; // Optional: replace with spinner if you like
};

export default GoogleSuccess;
