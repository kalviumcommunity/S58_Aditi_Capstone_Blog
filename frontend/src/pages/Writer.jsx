import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
      const response = await axios.post(`${API_URL}/articles`, article, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newArticleId = response.data._id;
      navigate(`/article/${newArticleId}`); // ✅ Go to the created article
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post article");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h2>Write an Article</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Article Title"
          value={article.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="text"
          name="description"
          placeholder="Short Description"
          value={article.description}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <ReactQuill
          value={article.content}
          onChange={handleContentChange}
          placeholder="Start writing your article..."
          style={{
            height: "200px",
            marginBottom: "10px",
            backgroundColor: "#fff",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
          }}
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
