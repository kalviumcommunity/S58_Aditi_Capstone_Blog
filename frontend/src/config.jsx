<<<<<<< HEAD
export const API_URL = "https://medium-clone-8hte.onrender.com/api";

// error : ignore.
=======
// src/config.jsx   (or wherever your config is)
const isDev = window.location.port === "5173"; // Vite dev
export const API_URL = isDev
  ? "http://localhost:5001/api" // dev backend
  : "https://medium-clone-8hte.onrender.com/api"; // prod backend
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
