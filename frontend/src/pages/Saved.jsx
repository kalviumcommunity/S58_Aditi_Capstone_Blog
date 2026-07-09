import { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard";
import { API_URL } from "../config";
import "./Saved.css";

const Saved = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await axios.get(`${API_URL}/articles/user/bookmarks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArticles(res.data);
      } catch (err) {
        console.error("Failed to load saved articles", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, [token]);

  return (
    <div className="saved-container">
      <h1 className="saved-title">Saved</h1>
      <p className="saved-sub">Stories you&apos;ve bookmarked.</p>

      {loading ? (
        <p className="saved-status">Loading your saved stories...</p>
      ) : articles.length > 0 ? (
        <div className="saved-feed">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="saved-empty">
          <p>You haven&apos;t saved anything yet.</p>
          <span>
            Tap the bookmark icon on any story to keep it here for later.
          </span>
        </div>
      )}
    </div>
  );
};

export default Saved;
