const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token =
    req.heads.authorization && req.heads.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Inavlid token" });
  }
};

module.exports = authenticateToken;
