import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";
import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery("");
      setShowSearchInput(false);
    }
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  return (
    <nav className="navbar">
      {/* Left - Logo and Search */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          Familiar
        </Link>

        {/* Search moved into navbar-left */}
        <form onSubmit={handleSearch} className="simple-search-form">
          <input
            type="text"
            placeholder="Search Medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Center section removed or can be used for other elements */}
      <div className="navbar-center">
        {/* This can be empty or used for other elements */}
      </div>

      {/* Right - Links & Icons */}
      <div className="navbar-right">
        {isLoggedIn() ? (
          <>
            <Link to="/write" className="write-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
                  fill="currentColor"
                ></path>
                <path
                  d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5"
                  fill="currentColor"
                ></path>
              </svg>
              <span>Write</span>
            </Link>
            <button className="navbar-icon bell-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <div className="profile-menu">
              <div className="profile-circle">A</div>
              <div className="profile-dropdown">
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <Link to="/settings" className="dropdown-item">
                  Settings
                </Link>
                <button onClick={handleLogout} className="dropdown-item logout">
                  Sign out
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Sign In
            </Link>
            <Link to="/signup" className="get-started-btn">
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
