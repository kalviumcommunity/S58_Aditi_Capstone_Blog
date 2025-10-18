<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
// pages/Home.jsx
import { useEffect, useState, useCallback } from "react";
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "../components/ArticleCard";
import { API_URL } from "../config";
import "./Home.css";

<<<<<<< HEAD
=======
const LIMIT = 10;

>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
const Home = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
<<<<<<< HEAD
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
=======
  const [total, setTotal] = useState(null);

  const fetchMoreArticles = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/articles`, {
        params: { page, limit: LIMIT },
      });

      // Support both shapes: array OR { data, total }
      const payload = res.data;
      const batch = Array.isArray(payload) ? payload : payload?.data || [];
      const newTotal = Array.isArray(payload) ? null : payload?.total ?? null;

      setArticles((prev) => [...prev, ...batch]);
      setPage((prev) => prev + 1);
      if (newTotal !== null) setTotal(newTotal);

      // Stop when server returned less than requested (array mode),
      // or when we reached/exceeded total (object mode)
      if (
        (Array.isArray(payload) && batch.length < LIMIT) ||
        (!Array.isArray(payload) &&
          articles.length + batch.length >= (newTotal ?? 0))
      ) {
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setHasMore(false);
    }
<<<<<<< HEAD
  };

  useEffect(() => {
    fetchMoreArticles();
  }, []);
=======
  }, [API_URL, page, articles.length]);

  useEffect(() => {
    // Reset when component mounts (in case of navigations)
    setArticles([]);
    setPage(1);
    setHasMore(true);
    setTotal(null);
  }, []);

  useEffect(() => {
    fetchMoreArticles();
  }, [fetchMoreArticles]);
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)

  return (
    <div className="home-container">
      <div className="feed">
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreArticles}
          hasMore={hasMore}
          loader={<p>Loading more articles...</p>}
<<<<<<< HEAD
          endMessage={<p className="end-message">You've reached the end!</p>}
=======
          endMessage={
            <p className="end-message">
              {total
                ? `You've reached the end (${total} articles).`
                : "You've reached the end!"}
            </p>
          }
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
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
