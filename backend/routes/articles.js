<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const articles = await Article.find()
      .populate("author", "name")
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    res.json(articles);
=======
// routes/articles.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Article = require("../models/Article");
const authenticateToken = require("../middleware/authMiddleware");

// GET /api/articles?page=&limit=
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  try {
    const [articles, total] = await Promise.all([
      Article.find()
        .populate("author", "name")
        // Prefer createdAt when using schema timestamps; fall back to date/_id
        .sort({ createdAt: -1, date: -1, _id: -1 })
        .skip(skip)
        .limit(limit),
      Article.countDocuments(),
    ]);

    res.json({ data: articles, page, limit, total });
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< HEAD
// populating
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("author", "name")
      .populate("comments.user", "name");
=======
// GET /api/articles/:id
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid article id" });
    }

    const article = await Article.findById(req.params.id)
      .populate("author", "name")
      .populate("comments.user", "name");

>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< HEAD
router.post("/", authenticateToken, async (req, res) => {
  const { title, description, content } = req.body;
  const newArticle = new Article({
    title,
    description,
    content,
    author: req.user.id,
  });

  try {
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    if (article.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    const updated = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    if (article.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });
=======
// POST /api/articles
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { title, description, content } = req.body || {};
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "title and content are required" });
    }

    const newArticle = new Article({
      title: title.trim(),
      description: description?.trim(),
      content,
      author: req.user.id,
    });

    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    // 400 for validation issues, else 500
    const code = err.name === "ValidationError" ? 400 : 500;
    res.status(code).json({ message: err.message });
  }
});

// PUT /api/articles/:id
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid article id" });
    }

    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Whitelist fields to update
    const allowed = ["title", "description", "content"];
    const update = Object.fromEntries(
      Object.entries(req.body || {}).filter(([k]) => allowed.includes(k))
    );

    const updated = await Article.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    res.json(updated);
  } catch (err) {
    const code = err.name === "ValidationError" ? 400 : 500;
    res.status(code).json({ message: err.message });
  }
});

// DELETE /api/articles/:id
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid article id" });
    }

    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)

    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< HEAD
// Like or Unlike an Article
router.post("/:id/like", authenticateToken, async (req, res) => {
  try {
=======
// POST /api/articles/:id/like (toggle)
router.post("/:id/like", authenticateToken, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid article id" });
    }

>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    const userId = req.user.id;
<<<<<<< HEAD
    const hasLiked = article.likes.includes(userId);

    if (hasLiked) {
      article.likes = article.likes.filter((id) => id.toString() !== userId);
=======
    const idx = article.likes.findIndex((id) => id.toString() === userId);

    if (idx >= 0) {
      article.likes.splice(idx, 1);
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    } else {
      article.likes.push(userId);
    }

    await article.save();
<<<<<<< HEAD
    res.json({ likes: article.likes.length });
=======
    res.json({ liked: idx === -1, likes: article.likes.length });
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< HEAD
// Add a comment to an article
router.post("/:id/comment", authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    const newComment = { user: req.user.id, text };
    article.comments.push(newComment);

    await article.save();
=======
// POST /api/articles/:id/comment
router.post("/:id/comment", authenticateToken, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid article id" });
    }

    const { text } = req.body || {};
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    const newComment = { user: req.user.id, text: text.trim() };
    article.comments.push(newComment);

    await article.save();
    // Optionally return populated comments:
    await article.populate("comments.user", "name");
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    res.json(article.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< HEAD
// Get all comments for an article
router.get("/:id/comments", async (req, res) => {
  try {
=======
// GET /api/articles/:id/comments
router.get("/:id/comments", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid article id" });
    }

>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    const article = await Article.findById(req.params.id).populate(
      "comments.user",
      "name"
    );
    if (!article) return res.status(404).json({ message: "Article not found" });

    res.json(article.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
