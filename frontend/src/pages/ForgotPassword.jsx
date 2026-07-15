import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { Link } from "react-router-dom";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/auth/forgot-password`, {
        email,
      });
      setMessage(data.message);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (err.code === "ERR_NETWORK"
            ? "Network error: API unreachable"
            : "Something went wrong"),
      );
    } finally {
      setLoading(false);
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
            <Link to="/signup" className="auth-tab">
              Create account
            </Link>
          </div>

          {!message ? (
            <>
              <h1 className="auth-title">Forgot your password?</h1>
              <p className="auth-sub">
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </>
          ) : null}

          {error && <p className="auth-error">{error}</p>}

          {message && (
            <div className="auth-confirm">
              <div className="auth-confirm-icon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16v16H4z" opacity="0" />
                  <path d="M22 6l-10 7L2 6" />
                  <path d="M2 6h20v12H2z" />
                </svg>
              </div>
              <h1 className="auth-title">Check your inbox</h1>
              <p className="auth-confirm-text">{message}</p>
            </div>
          )}

          {!message && (
            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="auth-btn auth-btn-primary"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          )}

          <p className="auth-foot">
            Remember it? <Link to="/login">Back to sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
