import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Profile from "./pages/Profile";
import Writer from "./pages/Writer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GoogleSuccess from "./pages/GoogleSuccess";
import PrivateRoute from "./utils/PrivateRoute";
import SearchResults from "./pages/SearchResults";
import EditArticle from "./pages/EditArticle";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/:id/" element={<Profile />} />
        <Route path="/search" element={<SearchResults />} />{" "}
        <Route
          path="/write"
          element={
            <PrivateRoute>
              <Writer />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditArticle />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
