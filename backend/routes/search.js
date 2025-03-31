const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const User = require("../models/User");

// Search articles and users
router.get("/", async (req, res) => {
  const query = req.query.q;

  if (!query) return res.status(400).json({ message: "Search query missing" });

  try {
    // Search articles by title or description
    const articles = await Article.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).populate("author", "name");

    // Search users by name or email
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    res.json({ articles, users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
