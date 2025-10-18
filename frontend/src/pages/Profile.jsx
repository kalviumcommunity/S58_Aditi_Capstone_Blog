<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
// pages/Profile.jsx
import { useEffect, useMemo, useState } from "react";
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import "./Profile.css";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [articles, setArticles] = useState([]);
<<<<<<< HEAD
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`${API_URL}/users/${id}`).then((res) => {
      setUser(res.data.user);
      setArticles(
        res.data.articles.sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      setIsFollowing(res.data.user.followers.includes(currentUserId));
    });
  }, [id, currentUserId]);

  const handleFollowToggle = async () => {
    const endpoint = isFollowing ? "unfollow" : "follow";
    try {
      await axios.post(
        `${API_URL}/users/${id}/${endpoint}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error("Follow/unfollow failed", err);
=======
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");

  // axios instance w/ base + auth header
  const api = useMemo(() => {
    const inst = axios.create({
      baseURL: API_URL,
      headers: { "Content-Type": "application/json" },
    });
    if (token) inst.defaults.headers.common.Authorization = `Bearer ${token}`;
    return inst;
  }, [token]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setError("");
        const { data } = await api.get(`/users/${id}`);
        if (!mounted) return;

        const u = data.user;
        const list = Array.isArray(data.articles)
          ? data.articles
          : data.articles?.data || [];

        // sort by createdAt (fallback to date)
        const sorted = [...list].sort((a, b) => {
          const da = new Date(a.createdAt || a.date || 0).getTime();
          const db = new Date(b.createdAt || b.date || 0).getTime();
          return db - da;
        });

        setUser(u);
        setArticles(sorted);

        // followers may be ObjectIds or populated docs
        const followerIds = (u.followers || []).map((f) =>
          typeof f === "string" ? f : f?._id
        );
        setIsFollowing(followerIds.includes(currentUserId));
      } catch (e) {
        setError(
          e.response?.data?.message ||
            "Failed to load profile. Please try again."
        );
      }
    })();
    return () => {
      mounted = false;
    };
  }, [api, id, currentUserId]);

  const handleFollowToggle = async () => {
    if (!token) return;
    const endpoint = isFollowing ? "unfollow" : "follow";
    try {
      await api.post(`/users/${id}/${endpoint}`, {});
      setIsFollowing((v) => !v);
      // Optimistically update local counts
      setUser((u) => {
        if (!u) return u;
        const followers = Array.isArray(u.followers) ? [...u.followers] : [];
        if (endpoint === "follow") {
          // push minimal shape if not present
          if (!followers.some((f) => (f._id || f) === currentUserId)) {
            followers.push({ _id: currentUserId, name: "You" });
          }
        } else {
          const idx = followers.findIndex(
            (f) => (f._id || f) === currentUserId
          );
          if (idx >= 0) followers.splice(idx, 1);
        }
        return { ...u, followers };
      });
    } catch (err) {
      console.error("Follow/unfollow failed", err);
      setError("Action failed. Please try again.");
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
<<<<<<< HEAD
      <div className="profile-header">
        <h1>{user.name}</h1>
        <p className="profile-email">{user.email}</p>
=======
      {error && <p className="profile-error">{error}</p>}

      <div className="profile-header">
        <h1>{user.name}</h1>
        {user.email && <p className="profile-email">{user.email}</p>}
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
        {user.bio ? (
          <p className="profile-bio">{user.bio}</p>
        ) : (
          <p className="profile-bio empty">No bio added yet.</p>
        )}

        {token && currentUserId !== id && (
          <button
            className={`follow-btn ${isFollowing ? "unfollow" : "follow"}`}
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      <div className="profile-social">
        <div>
          <strong>Followers:</strong>{" "}
<<<<<<< HEAD
          {user.followers.length ? (
            user.followers.map((f) => (
              <Link key={f._id} to={`/profile/${f._id}`}>
                {f.name}
              </Link>
            ))
=======
          {user.followers?.length ? (
            user.followers.map((f) => {
              const fid = f?._id || f;
              const name = f?.name || "User";
              return (
                <Link key={fid} to={`/profile/${fid}`}>
                  {name}
                </Link>
              );
            })
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
          ) : (
            <span>None</span>
          )}
        </div>

        <div>
          <strong>Following:</strong>{" "}
<<<<<<< HEAD
          {user.following.length ? (
            user.following.map((f) => (
              <Link key={f._id} to={`/profile/${f._id}`}>
                {f.name}
              </Link>
            ))
=======
          {user.following?.length ? (
            user.following.map((f) => {
              const fid = f?._id || f;
              const name = f?.name || "User";
              return (
                <Link key={fid} to={`/profile/${fid}`}>
                  {name}
                </Link>
              );
            })
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
          ) : (
            <span>None</span>
          )}
        </div>
      </div>

      <h3 className="profile-articles-heading">Articles by {user.name}</h3>

      <div className="profile-articles">
        {articles.length === 0 ? (
          <p>No articles yet.</p>
        ) : (
          articles.map((article) => (
            <div className="article-card" key={article._id}>
              <Link to={`/article/${article._id}`}>
                <h4>{article.title}</h4>
              </Link>
              <p>{article.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
