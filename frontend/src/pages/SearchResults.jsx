<<<<<<< HEAD
=======
// pages/SearchResults.jsx
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const SearchResults = () => {
<<<<<<< HEAD
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/search?q=${query}`).then((res) => {
      setArticles(res.data.articles);
      setUsers(res.data.users);
      setLoading(false);
    });
  }, [query]);

  if (loading) return <p>Loading results...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>Search Results for "{query}"</h2>
=======
  const location = useLocation();
  const q = new URLSearchParams(location.search).get("q") || "";

  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setErrMsg("");

        const res = await axios.get(`${API_URL}/search`, {
          params: { q, page: 1, limit: 10, type: "all" }, // type can be "articles"|"users"|"all"
        });

        const payload = res.data || {};
        // Support both shapes:
        // - array mode: { articles: [], users: [] }
        // - object mode: { data: { articles: [], users: [] }, totals: { ... } }
        const dataBlock = Array.isArray(payload) ? {} : payload.data || payload;
        const arts = dataBlock.articles || payload.articles || [];
        const usrs = dataBlock.users || payload.users || [];

        if (!cancelled) {
          setArticles(arts);
          setUsers(usrs);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setErrMsg(
            err.response?.data?.message ||
              (err.code === "ERR_NETWORK"
                ? "Network error: API unreachable"
                : "Failed to fetch results")
          );
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [q]);

  if (loading) return <p>Loading results...</p>;
  if (errMsg) return <p style={{ color: "crimson" }}>{errMsg}</p>;

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2>Search Results for “{q}”</h2>
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)

      <h3>Articles</h3>
      {articles.length > 0 ? (
        articles.map((article) => (
<<<<<<< HEAD
          <div key={article._id}>
            <Link to={`/article/${article._id}`}>
              <h4>{article.title}</h4>
            </Link>
            <p>{article.description}</p>
=======
          <div key={article._id} style={{ marginBottom: 16 }}>
            <Link to={`/article/${article._id}`}>
              <h4 style={{ margin: "0 0 6px" }}>{article.title}</h4>
            </Link>
            <p style={{ margin: 0 }}>{article.description}</p>
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
          </div>
        ))
      ) : (
        <p>No matching articles found.</p>
      )}

<<<<<<< HEAD
      <h3>Users</h3>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user._id}>
            <Link to={`/profile/${user._id}`}>
              <p>
                {user.name} ({user.email})
=======
      <h3 style={{ marginTop: 32 }}>Users</h3>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user._id} style={{ marginBottom: 10 }}>
            <Link to={`/profile/${user._id}`}>
              <p style={{ margin: 0 }}>
                {user.name} {user.email ? `(${user.email})` : ""}
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
              </p>
            </Link>
          </div>
        ))
      ) : (
        <p>No matching users found.</p>
      )}
    </div>
  );
};

export default SearchResults;
