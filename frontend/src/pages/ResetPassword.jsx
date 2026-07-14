import { useState } from "react";
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
      // send them to login after a moment
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
          <h1 className="auth-title">Set a new password</h1>
          <p className="auth-sub">Choose something you&apos;ll remember.</p>

          {error && <p className="auth-error">{error}</p>}
          {message && <p className="auth-success">{message}</p>}

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

          <p className="auth-foot">
            <Link to="/login">Back to sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
