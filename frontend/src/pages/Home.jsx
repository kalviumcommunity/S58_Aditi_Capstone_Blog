import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "../components/ArticleCard";
import { API_URL } from "../config";
import "./Home.css";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 10;

  const fetchMoreArticles = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/articles?page=${page}&limit=${LIMIT}`
      );
      const newArticles = res.data;

      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      setPage((prevPage) => prevPage + 1);

      if (newArticles.length < LIMIT) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchMoreArticles();
  }, []);

  return (
    <div className="home-container">
      <div className="feed">
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreArticles}
          hasMore={hasMore}
          loader={<p>Loading more articles...</p>}
          endMessage={<p className="end-message">You've reached the end!</p>}
        >
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </InfiniteScroll>
      </div>

      <div className="sidebar">
        <h3>Trending on Medium</h3>
        <ul>
          <li>Why MERN Stack is the Future</li>
          <li>React Hooks You Should Know</li>
          <li>The Rise of NoSQL Databases</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
