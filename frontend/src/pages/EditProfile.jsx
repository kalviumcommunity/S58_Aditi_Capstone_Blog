import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import "./EditProfile.css";

const Settings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({ name: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/users/${userId}`)
      .then((res) => {
        setForm({
          name: res.data.user.name || "",
          bio: res.data.user.bio || "",
        });
      })
      .catch((err) => console.error("Failed to load profile", err))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await axios.put(`${API_URL}/users/${userId}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // keep navbar name in sync if it changed
      localStorage.setItem("userName", res.data.name || "");

      setMessage("Saved");
      setTimeout(() => navigate(`/profile/${userId}`), 700);
    } catch (err) {
      console.error("Failed to save", err);
      setMessage("Something went wrong. Try again.");
      setSaving(false);
    }
  };

  if (loading) return <p className="settings-loading">Loading...</p>;

  return (
    <div className="settings-container">
      <h1 className="settings-title">Edit profile</h1>
      <p className="settings-sub">Update how others see you on Familiar.</p>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="settings-field">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows="4"
            placeholder="Tell people a little about yourself"
          />
        </div>

        <div className="settings-actions">
          <button
            type="button"
            className="settings-cancel"
            onClick={() => navigate(`/profile/${userId}`)}
          >
            Cancel
          </button>
          <button type="submit" className="settings-save" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>

        {message && <p className="settings-message">{message}</p>}
      </form>
    </div>
  );
};

export default Settings;
