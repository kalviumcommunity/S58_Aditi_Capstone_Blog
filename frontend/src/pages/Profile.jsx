import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [articles, setArticles] = useState([]);
  const token = localStorage.getItem("token");
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`${API_URL}/users/${id}`).then((response) => {
      setUser(response.data.user);

      // Sort articles by newest first
      const sortedArticles = response.data.articles.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setArticles(sortedArticles);

      if (response.data.user.followers.includes(currentUserId)) {
        setIsFollowing(true);
      }
    });
  }, [id, currentUserId]);

  if (!user) return <p>Loading...</p>;

  const handleFollow = async () => {
    try {
      await axios.post(
        `${API_URL}/users/${id}/follow`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFollowing(true);
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.post(
        `${API_URL}/users/${id}/unfollow`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFollowing(false);
    } catch (err) {
      console.error("Error unfollowing user:", err);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>{user.name}</h2>
      <p>
        Email: <strong>{user.email}</strong>
      </p>

      {user.bio ? (
        <p>Bio: {user.bio}</p>
      ) : (
        <p>
          <i>No bio added yet.</i>
        </p>
      )}

      <p>
        <strong>Followers:</strong>{" "}
        {user.followers.length === 0
          ? "None"
          : user.followers.map((f) => (
              <Link
                key={f._id}
                to={`/profile/${f._id}`}
                style={{ marginRight: "8px" }}
              >
                {f.name}
              </Link>
            ))}
      </p>
      <p>
        <strong>Following:</strong>{" "}
        {user.following.length === 0
          ? "None"
          : user.following.map((f) => (
              <Link
                key={f._id}
                to={`/profile/${f._id}`}
                style={{ marginRight: "8px" }}
              >
                {f.name}
              </Link>
            ))}
      </p>

      {token &&
        String(currentUserId) !== String(id) &&
        (isFollowing ? (
          <button
            type="button"
            onClick={handleUnfollow}
            style={{
              backgroundColor: "red",
              color: "white",
              marginTop: "10px",
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFollow}
            style={{
              backgroundColor: "green",
              color: "white",
              marginTop: "10px",
            }}
          >
            Follow
          </button>
        ))}

      <h3 style={{ marginTop: "30px" }}>Articles by {user.name}</h3>
      {articles.length === 0 ? (
        <p>No articles yet.</p>
      ) : (
        articles.map((article) => (
          <div
            key={article._id}
            style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}
          >
            <h3>
              <Link
                to={`/article/${article._id}`}
                style={{ color: "black", textDecoration: "none" }}
              >
                {article.title}
              </Link>
            </h3>
            <p>{article.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
