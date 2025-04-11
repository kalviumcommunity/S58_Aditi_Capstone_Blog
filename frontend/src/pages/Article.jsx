import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import "./Article.css"; // ✅ new stylesheet

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchArticle = async () => {
    try {
      const articleRes = await axios.get(`${API_URL}/articles/${id}`);
      setArticle(articleRes.data);
      const commentRes = await axios.get(`${API_URL}/articles/${id}/comments`);
      setComments(commentRes.data);
    } catch (err) {
      console.error("Error loading article:", err);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/articles/${id}/comment`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentText("");
      fetchArticle();
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (err) {
      console.error("Failed to delete article", err);
    }
  };

  const handleLike = async () => {
    try {
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
    }
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div className="article-container">
      <h1 className="article-title">{article.title}</h1>
      <p className="article-description">{article.description}</p>

      <div className="article-meta">
        <span
          className="article-author"
          onClick={() => navigate(`/profile/${article.author._id}`)}
        >
          {article.author.name}
        </span>{" "}
        · {new Date(article.date).toLocaleDateString()}
      </div>

      <div
        className="article-content"
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
        <button onClick={handleLike}>❤️ {article.likes.length}</button>
        <button onClick={handleBookmark}>🔖 {article.bookmarks.length}</button>
      </div>

      <div className="article-comments">
        <h3>Responses</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <p key={comment._id}>
              <strong>{comment.user.name}:</strong> {comment.text}
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
