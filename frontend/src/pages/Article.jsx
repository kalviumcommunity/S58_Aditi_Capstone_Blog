import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  // Fetch article and comments
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

  // Submit a comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/articles/${id}/comment`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentText("");
      fetchArticle(); // Refetch updated comments
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  // Delete article
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

  // Like article
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

  // Bookmark article
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
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h1>{article.title}</h1>
      <p>{article.description}</p>

      <p style={{ marginTop: "10px", fontStyle: "italic" }}>
        Written by{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate(`/profile/${article.author._id}`)}
        >
          {article.author.name}
        </span>
      </p>

      <div dangerouslySetInnerHTML={{ __html: article.content }} />

      {article.author._id === userId && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
          <button
            onClick={handleDelete}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete
          </button>
        </div>
      )}

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleLike}>Like ({article.likes.length})</button>
        <button onClick={handleBookmark} style={{ marginLeft: "10px" }}>
          Bookmark ({article.bookmarks.length})
        </button>
      </div>

      <h3 style={{ marginTop: "30px" }}>Comments</h3>
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
        <form onSubmit={handleCommentSubmit} style={{ marginTop: "10px" }}>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            required
            style={{ padding: "8px", width: "70%" }}
          />
          <button type="submit" style={{ marginLeft: "10px" }}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Article;
