import { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "../components/ArticleCard";
import { API_URL } from "../config";

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
        setHasMore(false); // No more articles to fetch
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
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      {/* Main Feed */}
      <div style={{ flex: 2, marginRight: "20px" }}>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreArticles}
          hasMore={hasMore}
          loader={<p>Loading more articles...</p>}
          endMessage={
            <p style={{ textAlign: "center" }}>You've reached the end!</p>
          }
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

      {/* Sidebar */}
      <div
        style={{ flex: 1, borderLeft: "1px solid #ddd", paddingLeft: "20px" }}
      >
        <h3>Trending on Medium</h3>
        <ul>
          <li>1. Why MERN Stack is the Future</li>
          <li>2. React Hooks You Should Know</li>
          <li>3. The Rise of NoSQL Databases</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
