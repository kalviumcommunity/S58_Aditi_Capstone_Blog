import { Link } from "react-router-dom";
import "./ArticleCard.css";

const ArticleCard = ({ article }) => {
  const { _id, title, description, author, date } = article;

  return (
    <div className="article-card">
      <Link to={`/article/${_id}`} className="article-title">
        <h2>{title}</h2>
      </Link>
      <p className="article-description">{description}</p>
      <div className="article-footer">
        <span className="author-name">{author?.name || "Unknown Author"}</span>
        <span className="dot">•</span>
        <span className="publish-date">
          {new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default ArticleCard;
