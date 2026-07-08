import { Link } from "react-router-dom";
import "./ArticleCard.css";

const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

const getFirstImage = (html) => {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
};

const ArticleCard = ({ article }) => {
  const { _id, title, description, author, date, content } = article;
  const cover = getFirstImage(content);

  return (
    <div className="article-card">
      <div className="card-byline">
        <div className="card-avatar">{getInitial(author?.name)}</div>
        <span className="card-author">{author?.name || "Unknown Author"}</span>
        <span className="card-dot">·</span>
        <span className="card-date">
          {new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      <Link to={`/article/${_id}`} className="card-main">
        <div className="card-text">
          <h2 className="card-title">{title}</h2>
          {description && <p className="card-description">{description}</p>}
        </div>
        {cover && (
          <div className="card-thumb">
            <img src={cover} alt="" />
          </div>
        )}
      </Link>
    </div>
  );
};

export default ArticleCard;
