import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (confirmText !== "DELETE") return;
    setDeleting(true);
    setError("");

    try {
      await axios.delete(`${API_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      navigate("/signup", { replace: true });
    } catch (err) {
      console.error("Failed to delete account", err);
      setError("Something went wrong. Try again.");
      setDeleting(false);
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Settings</h1>
      <p className="settings-sub">Manage your account.</p>

      <div className="danger-zone">
        <h2 className="danger-title">Delete account</h2>
        <p className="danger-text">
          This permanently deletes your account and all your stories. This
          cannot be undone.
        </p>

        <label className="danger-label">
          Type <strong>DELETE</strong> to confirm
        </label>
        <input
          type="text"
          className="danger-input"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="DELETE"
        />

        <button
          className="danger-btn"
          onClick={handleDelete}
          disabled={confirmText !== "DELETE" || deleting}
        >
          {deleting ? "Deleting..." : "Delete my account"}
        </button>

        {error && <p className="danger-error">{error}</p>}
      </div>
    </div>
  );
};

export default Settings;
