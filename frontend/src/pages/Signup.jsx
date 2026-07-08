// pages/Signup.jsx
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Same Google flow as Login. Works for new users too.
  const GOOGLE_URL = `${API_URL}/auth/google`;
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_URL;
  };

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      localStorage.setItem("userName", data.user.name || "");

      const to = location.state?.from?.pathname || "/";
      navigate(to, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.code === "ERR_NETWORK"
          ? "Network error: API unreachable"
          : "Signup failed");
      setError(msg);
    }
  };

  return (
    <div className="auth-shell">
      <aside className="auth-left">
        <div className="auth-wordmark">Familiar</div>
        <p className="auth-statement">
          Where <em>ideas</em> find the people who need them.
        </p>
        <p className="auth-footnote">
          A quiet place to read, write, and think out loud. Stories from writers
          on any topic that matters.
        </p>
      </aside>

      <main className="auth-right">
        <div className="auth-card">
          <div className="auth-tabs">
            <Link to="/login" className="auth-tab">
              Sign in
            </Link>
            <span className="auth-tab active">Create account</span>
          </div>

          <h1 className="auth-title">Join Familiar</h1>
          <p className="auth-sub">Start reading and writing in a minute.</p>

          {error && <p className="auth-error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="auth-btn auth-btn-primary">
              Create account
            </button>
          </form>

          <div className="auth-divider">or</div>

          <button onClick={handleGoogleLogin} className="auth-btn-google">
            <svg viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.1 0 24 0 14.6 0 6.4 5.4 2.5 13.3l7.8 6.1C12.2 13.6 17.6 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.3 5.7c4.3-4 6.7-9.8 6.7-17.4z"
              />
              <path
                fill="#FBBC05"
                d="M10.3 28.6c-.5-1.4-.7-2.9-.7-4.6s.3-3.2.7-4.6l-7.8-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.5 10.7l7.8-6.1z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.1 0 11.3-2 15-5.5l-7.3-5.7c-2 1.4-4.7 2.3-7.7 2.3-6.4 0-11.8-4.1-13.7-9.9l-7.8 6.1C6.4 42.6 14.6 48 24 48z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="auth-foot">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;
