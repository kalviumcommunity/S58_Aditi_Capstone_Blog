<<<<<<< HEAD
=======
// pages/GoogleSuccess.jsx
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
<<<<<<< HEAD

    if (token) {
      localStorage.setItem("token", token.trim()); // ✅ Trim to avoid hidden whitespaces
      navigate("/", { replace: true }); // ✅ Prevents back-nav to success URL
    } else {
=======
    const error = queryParams.get("error");

    if (error) {
      console.error("Google OAuth Error:", error);
      alert("Google login failed. Please try again.");
      navigate("/login");
      return;
    }

    if (token) {
      localStorage.setItem("token", token.trim());
      // optional: you can fetch user details with the token here
      navigate("/", { replace: true });
    } else {
      // no token, likely redirected manually
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
      navigate("/login");
    }
  }, [location, navigate]);

<<<<<<< HEAD
  return <p>Logging you in via Google...</p>; // Optional: replace with spinner if you like
=======
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h3>Logging you in via Google...</h3>
      <p>Please wait while we complete authentication.</p>
    </div>
  );
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
};

export default GoogleSuccess;
