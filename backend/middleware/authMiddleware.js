<<<<<<< HEAD
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("Authorization Header:", authHeader); // ✅ move this here

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: No Token Provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid Token" });
=======
// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// optional helper: parse "Bearer <token>" robustly
function getTokenFromAuthHeader(header) {
  if (!header || typeof header !== "string") return null;
  const parts = header.split(" ");
  if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
    return parts[1]?.trim() || null;
  }
  // allow raw token (not recommended, but avoids surprise 500s)
  return header.trim() || null;
}

function authenticateToken(req, res, next) {
  if (!process.env.JWT_SECRET) {
    console.warn("⚠️  JWT_SECRET is not set. Token verification will fail.");
  }

  // Prefer Authorization header; fall back to cookie named "token" if present
  const authHeader = req.headers["authorization"];
  const cookieToken = req.cookies?.token || req.signedCookies?.token || null; // harmless if you don't use cookies
  const token = getTokenFromAuthHeader(authHeader) || cookieToken;

  // Debug (safe): don’t log the full token
  // console.log("Authorization Header present:", Boolean(authHeader), "Cookie token present:", Boolean(cookieToken));

  if (!token) {
    return res.status(401).json({ message: "Missing authentication token" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Normalize: ensure we always have req.user.id as a string
    const id = (payload.id || payload._id || payload.userId || "").toString();
    req.user = { ...payload, id };
    return next();
  } catch (err) {
    // Token expired vs invalid: choose message as you like
    const isExpired = err?.name === "TokenExpiredError";
    return res
      .status(401)
      .json({ message: isExpired ? "Token expired" : "Invalid token" });
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
  }
}

module.exports = authenticateToken;
