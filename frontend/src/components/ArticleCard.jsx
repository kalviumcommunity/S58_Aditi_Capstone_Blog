import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const { _id, title, description, author, date } = article;

  const cardStyle = {
    borderBottom: "1px solid #ddd",
    padding: "20px 0",
  };

  const titleStyle = {
    marginBottom: "10px",
    textDecoration: "none",
    color: "black",
  };

  const descriptionStyle = {
    color: "#555",
  };

  const footerStyle = {
    marginTop: "10px",
    color: "#888",
  };

  return (
    <div style={cardStyle}>
      <Link to={`/article/${_id}`} style={titleStyle}>
        <h2>{title}</h2>
      </Link>
      <p style={descriptionStyle}>{description}</p>
      <div style={footerStyle}>
        By <strong>{author?.name || "Unknown Author"}</strong> on{" "}
        {new Date(date).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ArticleCard;
