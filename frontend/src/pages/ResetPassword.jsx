import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  // Check the link the moment the page loads, so a dead link never shows a form
  useEffect(() => {
    const checkToken = async () => {
      try {
        await axios.get(`${API_URL}/auth/reset-password/${token}/check`);
        setTokenValid(true);
      } catch {
        setTokenValid(false);
      } finally {
        setChecking(false);
      }
    };
    checkToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${API_URL}/auth/reset-password/${token}`,
        { password },
      );
      setMessage(data.message);
      setTimeout(() => navigate("/login", { replace: true }), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (err.code === "ERR_NETWORK"
            ? "Network error: API unreachable"
            : "Something went wrong"),
      );
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
          {checking && <p className="auth-sub">Checking your link...</p>}

          {!checking && !tokenValid && (
            <>
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
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </div>
                <h1 className="auth-title">This link has expired</h1>
                <p className="auth-confirm-text">
                  Reset links are only good for an hour. Request a fresh one and
                  we&apos;ll send it right over.
                </p>
              </div>
              <button
                className="auth-btn auth-btn-primary"
                onClick={() => navigate("/forgot-password")}
                style={{ marginTop: "20px" }}
              >
                Request a new link
              </button>
            </>
          )}

          {!checking && tokenValid && (
            <>
              <h1 className="auth-title">Set a new password</h1>
              <p className="auth-sub">Choose something you&apos;ll remember.</p>

              {error && <p className="auth-error">{error}</p>}
              {message && <p className="auth-confirm-text">{message}</p>}

              {!message && (
                <form onSubmit={handleSubmit}>
                  <div className="auth-field">
                    <label htmlFor="password">New password</label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="auth-field">
                    <label htmlFor="confirm">Confirm password</label>
                    <input
                      id="confirm"
                      type="password"
                      name="confirm"
                      placeholder="••••••••"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="auth-btn auth-btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update password"}
                  </button>
                </form>
              )}
            </>
          )}

          <p className="auth-foot">
            <Link to="/login">Back to sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
