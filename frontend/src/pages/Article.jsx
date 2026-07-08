import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { getInitial, getAvatarColor } from "../utils/avatarColor";
import "./Article.css";

const getReadTime = (html) => {
  if (!html) return "1 min read";
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
};

const cleanContent = (html) => {
  if (!html) return "";
  return html.replace(/<p>(\s|&nbsp;|<br\s*\/?>)*<\/p>/gi, "").trim();
};

const HeartIcon = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19.5 12.6 12 20l-7.5-7.4a5 5 0 1 1 7.5-6.6 5 5 0 1 1 7.5 6.6z" />
  </svg>
);

const CommentIcon = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 4 11.5 8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5z" />
  </svg>
);

const BookmarkIcon = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

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
        { headers: { Authorization: `Bearer ${token}` } },
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
        { headers: { Authorization: `Bearer ${token}` } },
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
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchArticle();
    } catch (err) {
      console.error("Failed to bookmark article", err);
    }
  };

  if (!article) return <p className="article-loading">Loading...</p>;

  const isOwner = article.author._id === userId;

  return (
    <div className="article-container">
      <header className="article-header">
        <h1 className="article-title">{article.title}</h1>
        {article.description && (
          <p className="article-description">{article.description}</p>
        )}

        <div className="article-byline">
          <div
            className="byline-avatar"
            style={{ background: getAvatarColor(article.author.name) }}
            onClick={() => navigate(`/profile/${article.author._id}`)}
          >
            {getInitial(article.author.name)}
          </div>
          <div className="byline-info">
            <span
              className="byline-name"
              onClick={() => navigate(`/profile/${article.author._id}`)}
            >
              {article.author.name}
            </span>
            <span className="byline-meta">
              {new Date(article.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              · {getReadTime(article.content)}
            </span>
          </div>
        </div>
      </header>

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: cleanContent(article.content) }}
      />

      {isOwner && (
        <div className="article-owner-actions">
          <button onClick={() => navigate(`/edit/${id}`)}>Edit</button>
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
        </div>
      )}

      <div className="article-engagement">
        <button className="engage-btn" onClick={handleLike}>
          <span
            className={`engage-icon ${article.likes.includes(userId) ? "liked-active" : ""}`}
          >
            <HeartIcon />
          </span>
          {article.likes.length}
        </button>
        <span className="engage-btn engage-static">
          <span className="engage-icon">
            <CommentIcon />
          </span>
          {comments.length}
        </span>
        <button
          className="engage-btn engage-bookmark"
          onClick={handleBookmark}
          aria-label="Bookmark"
        >
          <span className="engage-icon">
            <BookmarkIcon />
          </span>
          {article.bookmarks.length}
        </button>
      </div>

      <section className="responses-section">
        <h3 className="responses-title">Responses ({comments.length})</h3>

        {token && (
          <div className="comment-composer">
            <div
              className="composer-avatar"
              style={{ background: getAvatarColor(article.author.name) }}
            >
              {getInitial(article.author.name)}
            </div>
            <form className="composer-body" onSubmit={handleCommentSubmit}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="What are your thoughts?"
                rows="2"
                required
              />
              <div className="composer-actions">
                <button type="submit">Respond</button>
              </div>
            </form>
          </div>
        )}

        <div className="comment-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="comment-item">
                <div
                  className="comment-avatar"
                  style={{ background: getAvatarColor(comment.user.name) }}
                >
                  {getInitial(comment.user.name)}
                </div>
                <div className="comment-body">
                  <div className="comment-head">
                    <span className="comment-name">{comment.user.name}</span>
                    {comment.date && (
                      <span className="comment-time">
                        {new Date(comment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="comment-empty">
              No responses yet. Be the first to respond.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Article;
