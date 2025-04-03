const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const authenticateToken = require("../middleware/authMiddleware");

// GET all articles with pagination
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single article by ID
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "author",
      "name"
    );
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new article (protected)
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

// Update article (only author)
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

// Delete article (only author)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    if (article.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Like or Unlike an Article
router.post("/:id/like", authenticateToken, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    const userId = req.user.id;
    const hasLiked = article.likes.includes(userId);

    if (hasLiked) {
      article.likes = article.likes.filter((id) => id.toString() !== userId);
    } else {
      article.likes.push(userId);
    }

    await article.save();
    res.json({ likes: article.likes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a comment to an article
router.post("/:id/comment", authenticateToken, async (req, res) => {
  try {
    const { text } = req.body;
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    const newComment = { user: req.user.id, text };
    article.comments.push(newComment);

    await article.save();
    res.json(article.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all comments for an article
router.get("/:id/comments", async (req, res) => {
  try {
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
