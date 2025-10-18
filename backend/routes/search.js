<<<<<<< HEAD
=======
// routes/search.js
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const User = require("../models/User");

<<<<<<< HEAD
// Unified search route
router.get("/", async (req, res) => {
  const query = req.query.q;

  if (!query) return res.status(400).json({ message: "Search query missing" });

  try {
    // Search articles by title, description, or content
    const articles = await Article.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
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
=======
// Helper to escape regex special chars
const escapeRegExp = (s = "") => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// GET /api/search?q=...&page=1&limit=10&type=all|articles|users
router.get("/", async (req, res) => {
  try {
    const qRaw = (req.query.q || "").trim();
    if (!qRaw) return res.status(400).json({ message: "Search query missing" });

    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit, 10) || 10, 1),
      50
    );
    const skip = (page - 1) * limit;
    const type = (req.query.type || "all").toLowerCase();

    // If you’ve created text indexes, prefer $text for relevance:
    // Article: schema.index({ title: "text", description: "text", content: "text" })
    // User:    schema.index({ name: "text", email: "text" })
    const supportsText = false; // flip to true after adding indexes

    const queryRegex = new RegExp(escapeRegExp(qRaw), "i");

    // Build filters
    const articleFilter = supportsText
      ? { $text: { $search: qRaw } }
      : {
          $or: [
            { title: queryRegex },
            { description: queryRegex },
            { content: queryRegex },
          ],
        };

    const userFilter = supportsText
      ? { $text: { $search: qRaw } }
      : {
          $or: [{ name: queryRegex }, { email: queryRegex }],
        };

    // Sorting: prefer textScore when using $text; otherwise recency
    const articleSort = supportsText
      ? { score: { $meta: "textScore" } }
      : { createdAt: -1, _id: -1 };
    const userSort = supportsText
      ? { score: { $meta: "textScore" } }
      : { createdAt: -1, _id: -1 };

    // Selections
    const articleSelect = supportsText ? { score: { $meta: "textScore" } } : {};
    const userSelect = supportsText ? { score: { $meta: "textScore" } } : {};

    const tasks = [];

    if (type === "all" || type === "articles") {
      tasks.push(
        Promise.all([
          Article.find(articleFilter, articleSelect)
            .populate("author", "name")
            .sort(articleSort)
            .skip(skip)
            .limit(limit)
            .lean(),
          Article.countDocuments(articleFilter),
        ])
      );
    } else {
      tasks.push(Promise.resolve([[], 0]));
    }

    if (type === "all" || type === "users") {
      tasks.push(
        Promise.all([
          User.find(userFilter, { password: 0, ...userSelect })
            .sort(userSort)
            .skip(skip)
            .limit(limit)
            .lean(),
          User.countDocuments(userFilter),
        ])
      );
    } else {
      tasks.push(Promise.resolve([[], 0]));
    }

    const [[articles, articlesTotal], [users, usersTotal]] = await Promise.all(
      tasks
    );

    return res.json({
      query: qRaw,
      page,
      limit,
      totals: { articles: articlesTotal, users: usersTotal },
      data: { articles, users },
    });
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    res.status(500).json({ message: "Something went wrong" });
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
  }
});

module.exports = router;
