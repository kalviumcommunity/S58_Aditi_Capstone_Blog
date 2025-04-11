import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditArticle.css";

const EditArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API_URL}/articles/${id}`)
      .then((res) => setArticle(res.data))
      .catch(() => setError("Failed to fetch article"));
  }, [id]);

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setArticle({ ...article, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/articles/${id}`, article, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/article/${id}`);
    } catch (err) {
      setError("Failed to update article");
    }
  };

  if (!article) return <p>Loading article...</p>;

  return (
    <div className="edit-container">
      <h2 className="edit-heading">Edit your story</h2>
      {error && <p className="edit-error">{error}</p>}

      <form onSubmit={handleSubmit} className="edit-form">
        <input
          type="text"
          name="title"
          value={article.title}
          onChange={handleChange}
          placeholder="Title"
          className="edit-input title"
          required
        />

        <input
          type="text"
          name="description"
          value={article.description}
          onChange={handleChange}
          placeholder="Short description"
          className="edit-input description"
        />

        <ReactQuill
          value={article.content}
          onChange={handleContentChange}
          className="edit-editor"
        />

        <button type="submit" className="edit-submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
