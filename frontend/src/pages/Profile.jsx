import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import "./Profile.css";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [articles, setArticles] = useState([]);
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
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>{user.name}</h1>
        <p className="profile-email">{user.email}</p>
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
          {user.followers.length ? (
            user.followers.map((f) => (
              <Link key={f._id} to={`/profile/${f._id}`}>
                {f.name}
              </Link>
            ))
          ) : (
            <span>None</span>
          )}
        </div>

        <div>
          <strong>Following:</strong>{" "}
          {user.following.length ? (
            user.following.map((f) => (
              <Link key={f._id} to={`/profile/${f._id}`}>
                {f.name}
              </Link>
            ))
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
