import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Writer.css";

const cleanContent = (html) => {
  if (!html) return "";
  return html.replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "").trim();
};

const Write = () => {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    content: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setArticle({ ...article, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...article,
        content: cleanContent(article.content),
      };

      const response = await axios.post(`${API_URL}/articles`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newArticleId = response.data._id;
      navigate(`/article/${newArticleId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post article");
    }
  };

  return (
    <div className="writer-container">
      <form onSubmit={handleSubmit} className="writer-form">
        <div className="writer-topbar">
          <span className="writer-label">Draft</span>
          <button type="submit" className="writer-submit-btn">
            Publish
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

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
          placeholder="Short description (optional)"
          value={article.description}
          onChange={handleChange}
          className="writer-input description-input"
        />

        <ReactQuill
          value={article.content}
          onChange={handleContentChange}
          placeholder="Tell your story..."
          className="writer-editor"
        />
      </form>
    </div>
  );
};

export default Write;
