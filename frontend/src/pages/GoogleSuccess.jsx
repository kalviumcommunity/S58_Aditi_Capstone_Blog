import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const cleanToken = token.trim();
    localStorage.setItem("token", cleanToken);

    // fetch who this token belongs to, then save name + id
    axios
      .get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${cleanToken}` },
      })
      .then((res) => {
        localStorage.setItem("userId", res.data._id || "");
        localStorage.setItem("userName", res.data.name || "");
        navigate("/", { replace: true });
      })
      .catch(() => {
        // token saved but couldn't fetch user; still send them in
        navigate("/", { replace: true });
      });
  }, [location, navigate]);

  return <p>Logging you in via Google...</p>;
};

export default GoogleSuccess;
