import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
import { useNavigate, useLocation } from "react-router-dom";
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
<<<<<<< HEAD

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
=======
  const location = useLocation();

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, formData);

      localStorage.setItem("token", response.data.token); // ✅ Save JWT
      localStorage.setItem("userId", response.data.user._id); // ✅ Save userId

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
=======
    setError("");

    // basic client-side guard (optional; backend still enforces)
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/auth/signup`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);

      const to = location.state?.from?.pathname || "/";
      navigate(to, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.code === "ERR_NETWORK"
          ? "Network error: API unreachable"
          : "Signup failed");
      setError(msg);
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    }
  };

  return (
<<<<<<< HEAD
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
=======
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
<<<<<<< HEAD
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
=======
          style={{ width: "100%", padding: 10, margin: "10px 0" }}
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
        />
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
            color: "#fff",
            border: "none", // ✅ Match login button
=======
            padding: 10,
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
