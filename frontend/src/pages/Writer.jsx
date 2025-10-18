<<<<<<< HEAD
import { useState } from "react";
=======
// pages/Writer.jsx
import { useMemo, useState } from "react";
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
import axios from "axios";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Writer.css";

const Write = () => {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    content: "",
  });
<<<<<<< HEAD

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setArticle({ ...article, content: value });
=======
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // axios instance with base + auth header + 401 handling
  const api = useMemo(() => {
    const inst = axios.create({
      baseURL: API_URL,
      headers: { "Content-Type": "application/json" },
    });
    if (token) inst.defaults.headers.common.Authorization = `Bearer ${token}`;
    inst.interceptors.response.use(
      (r) => r,
      (err) => {
        if (err?.response?.status === 401) navigate("/login");
        return Promise.reject(err);
      }
    );
    return inst;
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((a) => ({ ...a, [name]: value }));
  };

  const handleContentChange = (value) => {
    setArticle((a) => ({ ...a, content: value }));
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    try {
      const response = await axios.post(`${API_URL}/articles`, article, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newArticleId = response.data._id;
      navigate(`/article/${newArticleId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post article");
=======
    setError("");

    const payload = {
      title: article.title.trim(),
      description: article.description.trim(),
      content: article.content, // rich text; don't trim HTML
    };

    if (!payload.title || !payload.description || !payload.content) {
      setError("Title, description, and content are required.");
      return;
    }

    try {
      const { data } = await api.post(`/articles`, payload);
      navigate(`/article/${data._id}`, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (err.code === "ERR_NETWORK"
          ? "Network error: API unreachable"
          : "Failed to post article");
      setError(msg);
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    }
  };

  return (
    <div className="writer-container">
      <h2 className="writer-heading">Write a new story</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="writer-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={article.title}
          onChange={handleChange}
          required
          className="writer-input title-input"
        />

        <input
          type="text"
          name="description"
<<<<<<< HEAD
          placeholder="Short description (optional)"
          value={article.description}
          onChange={handleChange}
=======
          placeholder="Short description"
          value={article.description}
          onChange={handleChange}
          required
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
          className="writer-input description-input"
        />

        <ReactQuill
          value={article.content}
          onChange={handleContentChange}
          placeholder="Tell your story..."
          className="writer-editor"
        />

        <button type="submit" className="writer-submit-btn">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
