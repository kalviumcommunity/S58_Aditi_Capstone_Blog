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
