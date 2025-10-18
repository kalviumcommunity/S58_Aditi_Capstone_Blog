<<<<<<< HEAD
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
=======
// pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config"; // keep this if API_URL already includes '/api'
import { useNavigate, useLocation } from "react-router-dom";
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
<<<<<<< HEAD

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
=======
  const location = useLocation();

  // If your API_URL includes '/api', this is correct:
  const GOOGLE_URL = `${API_URL}/auth/google`;
  // If you later change API_URL to be origin-only (no '/api'), switch to:
  // const GOOGLE_URL = `${API_URL}/api/auth/google`;

  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_URL;
  };

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id); // ✅ Store user ID

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
=======
    setError("");

    try {
      // NOTE: API_URL already has '/api', so '/auth/login' is correct
      const { data } = await axios.post(`${API_URL}/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      // store token + (optional) user id
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user?._id || "");

      // go back to where user tried to go, or home
      const to = location.state?.from?.pathname || "/";
      navigate(to, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.code === "ERR_NETWORK"
          ? "Network error: API unreachable"
          : "Login failed");
      setError(msg);
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    }
  };

  return (
<<<<<<< HEAD
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
=======
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
      <h2>Log In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
<<<<<<< HEAD
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
=======
          style={{ width: "100%", padding: 10, margin: "10px 0" }}
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
<<<<<<< HEAD
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
=======
          style={{ width: "100%", padding: 10, margin: "10px 0" }}
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
        />
        <button
          type="submit"
          style={{
            width: "100%",
<<<<<<< HEAD
            padding: "10px",
            backgroundColor: "#000",
=======
            padding: 10,
            background: "#000",
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
            color: "#fff",
            border: "none",
          }}
        >
          Log In
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <button
        onClick={handleGoogleLogin}
        style={{
          width: "100%",
<<<<<<< HEAD
          padding: "10px",
          backgroundColor: "#4285F4",
=======
          padding: 10,
          background: "#4285F4",
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
          color: "#fff",
          border: "none",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
