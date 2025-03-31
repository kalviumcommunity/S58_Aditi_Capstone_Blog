import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ Redirect to homepage after logout
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const linkStyle = {
    margin: "0 10px",
    textDecoration: "none",
    color: "black",
    fontSize: "16px",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      {/* Left - Logo */}
      <div>
        <Link
          to="/"
          style={{ ...linkStyle, fontSize: "24px", fontWeight: "bold" }}
        >
          Medium
        </Link>
      </div>

      {/* Center - Search */}
      <form onSubmit={handleSearch} style={{ display: "inline" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          Search
        </button>
      </form>

      {/* Right - Navigation Links */}
      <div>
        {isLoggedIn() ? (
          <>
            <Link to="/write" style={linkStyle}>
              Write
            </Link>
            <button
              onClick={handleLogout}
              style={{
                ...linkStyle,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/signup" style={linkStyle}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
