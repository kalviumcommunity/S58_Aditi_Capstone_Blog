<<<<<<< HEAD
/**
 * Get the stored JWT token from localStorage
 */
export const getToken = () => localStorage.getItem("token");

/**
 * Log the user out by clearing token (and optionally userId) from localStorage,
 * and redirecting them to the login page.
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId"); // Optional if you store user ID
  window.location.href = "/login"; // You can replace this with navigate() if using React Router in context
};

/**
 * Check if a user is logged in based on presence of JWT token.
 */
export const isLoggedIn = () => {
  return !!getToken(); // Returns true if token exists
};
=======
// src/utils/auth.jsx

/** Store & read token */
export const getToken = () => localStorage.getItem("token");
export const setToken = (token) => {
  if (token) localStorage.setItem("token", token);
};
export const clearToken = () => localStorage.removeItem("token");

/** Optional: persist minimal user info */
export const setUser = (user) =>
  localStorage.setItem("user", JSON.stringify(user));
export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};
export const clearUser = () => localStorage.removeItem("user");

/** Auth state helpers */
export const isLoggedIn = () => !!getToken();

/** Logout */
export const logout = () => {
  clearToken();
  clearUser();
  localStorage.removeItem("userId"); // if you stored it separately
  window.location.href = "/login";
};

/**
 * Fetch wrapper that auto-attaches Authorization header.
 * Usage:
 *   const res = await authFetch(`${API_URL}/api/articles`, { method: 'GET' });
 */
export async function authFetch(url, options = {}) {
  const token = getToken();
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const res = await fetch(url, { ...options, headers });
  // Optional: handle 401/403 automatically
  if (res.status === 401 || res.status === 403) {
    // token expired/invalid → force logout or show toast
    // logout(); // uncomment if you want auto-logout
  }
  return res;
}
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
