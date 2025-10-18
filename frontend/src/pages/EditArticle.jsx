<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
// pages/EditArticle.jsx
import { useEffect, useMemo, useState } from "react";
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditArticle.css";

const EditArticle = () => {
  const { id } = useParams();
<<<<<<< HEAD
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
=======
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // single axios client w/ baseURL + auth header
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: API_URL,
      headers: { "Content-Type": "application/json" },
    });
    if (token)
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    instance.interceptors.response.use(
      (r) => r,
      (err) => {
        if (err?.response?.status === 401) navigate("/login");
        return Promise.reject(err);
      }
    );
    return instance;
  }, [token, navigate]);

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const { data } = await api.get(`/articles/${id}`);
        setArticle({
          title: data.title || "",
          description: data.description || "",
          content: data.content || "",
        });
      } catch {
        setError("Failed to fetch article");
      }
    })();
  }, [api, id]);

  const handleChange = (e) => {
    setArticle((a) => ({ ...a, [e.target.name]: e.target.value }));
  };

  const handleContentChange = (value) => {
    setArticle((a) => ({ ...a, content: value }));
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      await axios.put(`${API_URL}/articles/${id}`, article, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/article/${id}`);
    } catch (err) {
      setError("Failed to update article");
=======
      setError("");
      const payload = {
        title: article.title?.trim(),
        description: article.description?.trim(),
        content: article.content,
      };
      await api.put(`/articles/${id}`, payload);
      navigate(`/article/${id}`, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update article");
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
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
<<<<<<< HEAD
=======
          required
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
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
