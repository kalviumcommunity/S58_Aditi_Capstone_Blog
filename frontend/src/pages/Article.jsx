<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import "./Article.css"; // ✅ new stylesheet
=======
// pages/Article.jsx
import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import "./Article.css";
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
<<<<<<< HEAD
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
=======

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

<<<<<<< HEAD
  const fetchArticle = async () => {
    try {
      const articleRes = await axios.get(`${API_URL}/articles/${id}`);
      setArticle(articleRes.data);
      const commentRes = await axios.get(`${API_URL}/articles/${id}/comments`);
      setComments(commentRes.data);
    } catch (err) {
      console.error("Error loading article:", err);
=======
  // single axios client so we don't forget the header
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: API_URL,
      headers: { "Content-Type": "application/json" },
    });
    if (token)
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    return instance;
  }, [token]);

  const fetchArticle = async () => {
    try {
      setError("");
      const [{ data: a }, { data: c }] = await Promise.all([
        api.get(`/articles/${id}`),
        api.get(`/articles/${id}/comments`),
      ]);
      setArticle(a);
      setComments(c);
    } catch (err) {
      console.error("Error loading article:", err);
      const msg = err.response?.data?.message || "Failed to load article";
      setError(msg);
      if (err.response?.status === 401) navigate("/login");
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    }
  };

  useEffect(() => {
    fetchArticle();
<<<<<<< HEAD
=======
    // eslint-disable-next-line react-hooks/exhaustive-deps
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
<<<<<<< HEAD
      await axios.post(
        `${API_URL}/articles/${id}/comment`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
=======
      setError("");
      await api.post(`/articles/${id}/comment`, { text: commentText });
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
      setCommentText("");
      fetchArticle();
    } catch (err) {
      console.error("Failed to add comment", err);
<<<<<<< HEAD
=======
      setError(err.response?.data?.message || "Failed to add comment");
      if (err.response?.status === 401) navigate("/login");
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    }
  };

  const handleDelete = async () => {
    try {
<<<<<<< HEAD
      await axios.delete(`${API_URL}/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (err) {
      console.error("Failed to delete article", err);
=======
      setError("");
      await api.delete(`/articles/${id}`);
      navigate("/");
    } catch (err) {
      console.error("Failed to delete article", err);
      setError(err.response?.data?.message || "Failed to delete article");
      if (err.response?.status === 401) navigate("/login");
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    }
  };

  const handleLike = async () => {
    try {
<<<<<<< HEAD
      await axios.post(
        `${API_URL}/articles/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchArticle();
    } catch (err) {
      console.error("Failed to like article", err);
    }
  };

  const handleBookmark = async () => {
    try {
      await axios.post(
        `${API_URL}/articles/${id}/bookmark`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchArticle();
    } catch (err) {
      console.error("Failed to bookmark article", err);
=======
      setError("");
      await api.post(`/articles/${id}/like`, {});
      fetchArticle();
    } catch (err) {
      console.error("Failed to like article", err);
      setError(err.response?.data?.message || "Failed to like article");
      if (err.response?.status === 401) navigate("/login");
    }
  };

  // NOTE: your backend does NOT have this route yet; either implement it or hide button.
  const handleBookmark = async () => {
    try {
      setError("");
      await api.post(`/articles/${id}/bookmark`, {}); // <-- backend needed
      fetchArticle();
    } catch (err) {
      console.error("Failed to bookmark article", err);
      setError("Bookmark is not implemented on server yet");
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    }
  };

  if (!article) return <p>Loading...</p>;

<<<<<<< HEAD
  return (
    <div className="article-container">
=======
  const displayDate =
    (article.createdAt && new Date(article.createdAt)) ||
    (article.date && new Date(article.date));

  return (
    <div className="article-container">
      {error && <p style={{ color: "crimson", marginBottom: 12 }}>{error}</p>}

>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
      <h1 className="article-title">{article.title}</h1>
      <p className="article-description">{article.description}</p>

      <div className="article-meta">
        <span
          className="article-author"
          onClick={() => navigate(`/profile/${article.author._id}`)}
        >
          {article.author.name}
<<<<<<< HEAD
        </span>{" "}
        · {new Date(article.date).toLocaleDateString()}
=======
        </span>
        {displayDate ? <> · {displayDate.toLocaleDateString()}</> : null}
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
      </div>

      <div
        className="article-content"
<<<<<<< HEAD
=======
        // Ensure you only render trusted HTML. If this comes from user input, consider sanitizing server-side.
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {article.author._id === userId && (
        <div className="article-actions">
          <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
        </div>
      )}

      <div className="article-reactions">
<<<<<<< HEAD
        <button onClick={handleLike}>❤️ {article.likes.length}</button>
        <button onClick={handleBookmark}>🔖 {article.bookmarks.length}</button>
=======
        <button onClick={handleLike}>❤️ {article.likes?.length ?? 0}</button>

        {/* Hide if backend bookmark route not implemented */}
        {"bookmarks" in article && (
          <button onClick={handleBookmark}>
            🔖 {article.bookmarks?.length ?? 0}
          </button>
        )}
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
      </div>

      <div className="article-comments">
        <h3>Responses</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <p key={comment._id}>
<<<<<<< HEAD
              <strong>{comment.user.name}:</strong> {comment.text}
=======
              <strong>{comment.user?.name || "User"}:</strong> {comment.text}
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
            </p>
          ))
        ) : (
          <p>No comments yet.</p>
        )}

        {token && (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="What are your thoughts?"
              required
            />
            <button type="submit">Respond</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Article;
