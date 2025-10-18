<<<<<<< HEAD
const express = require("express");
const router = express.Router();
=======
// routes/users.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
const User = require("../models/User");
const Article = require("../models/Article");
const authenticateToken = require("../middleware/authMiddleware");

<<<<<<< HEAD
// ✅ Get User Profile & Their Articles
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
=======
// helper: return safe user fields only
const toSafeUser = (u) => {
  if (!u) return null;
  const {
    _id,
    name,
    email,
    followers = [],
    following = [],
    createdAt,
    updatedAt,
  } = u.toObject ? u.toObject() : u;
  return { _id, name, email, followers, following, createdAt, updatedAt };
};

// GET /api/users/:id  -> profile + their articles (paginated)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit, 10) || 10, 1),
      50
    );
    const skip = (page - 1) * limit;

    const user = await User.findById(id)
      .select("-password")
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
      .populate("followers", "name")
      .populate("following", "name");

    if (!user) return res.status(404).json({ message: "User not found" });

<<<<<<< HEAD
    const articles = await Article.find({ author: req.params.id });

    res.json({ user, articles });
  } catch (err) {
=======
    const [articles, total] = await Promise.all([
      Article.find({ author: id })
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit),
      Article.countDocuments({ author: id }),
    ]);

    return res.json({
      user: toSafeUser(user),
      articles: { data: articles, page, limit, total },
    });
  } catch (err) {
    console.error("USER PROFILE ERROR:", err);
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< HEAD
=======
// POST /api/users/:id/follow
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
router.post("/:id/follow", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

<<<<<<< HEAD
=======
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    if (id === req.user.id) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

<<<<<<< HEAD
    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow)
      return res.status(404).json({ message: "User not found" });

    if (!currentUser.following.includes(id)) {
      currentUser.following.push(id);
      userToFollow.followers.push(req.user.id);

      await currentUser.save();
      await userToFollow.save();
    }

    res.json({ message: `You followed ${userToFollow.name}` });
  } catch (err) {
=======
    // ensure both users exist
    const [userToFollow, currentUser] = await Promise.all([
      User.findById(id),
      User.findById(req.user.id),
    ]);
    if (!userToFollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // use atomic updates to avoid duplicates/races
    await Promise.all([
      User.findByIdAndUpdate(req.user.id, { $addToSet: { following: id } }),
      User.findByIdAndUpdate(id, { $addToSet: { followers: req.user.id } }),
    ]);

    return res.json({ message: `You followed ${userToFollow.name}` });
  } catch (err) {
    console.error("FOLLOW ERROR:", err);
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< HEAD
=======
// POST /api/users/:id/unfollow
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
router.post("/:id/unfollow", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

<<<<<<< HEAD
=======
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    if (id === req.user.id) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

<<<<<<< HEAD
    const userToUnfollow = await User.findById(id);
    const currentUser = await User.findById(req.user.id);

    if (!userToUnfollow)
      return res.status(404).json({ message: "User not found" });

    currentUser.following = currentUser.following.filter(
      (uid) => uid.toString() !== id
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (uid) => uid.toString() !== req.user.id
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.json({ message: `You unfollowed ${userToUnfollow.name}` });
  } catch (err) {
=======
    const [userToUnfollow, currentUser] = await Promise.all([
      User.findById(id),
      User.findById(req.user.id),
    ]);
    if (!userToUnfollow || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await Promise.all([
      User.findByIdAndUpdate(req.user.id, { $pull: { following: id } }),
      User.findByIdAndUpdate(id, { $pull: { followers: req.user.id } }),
    ]);

    return res.json({ message: `You unfollowed ${userToUnfollow.name}` });
  } catch (err) {
    console.error("UNFOLLOW ERROR:", err);
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< HEAD
// ✅ Get All Registered Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("name email"); // optional: add more fields
    res.json(users);
  } catch (err) {
=======
// GET /api/users  -> list basic users (safe projection)
router.get("/", async (_req, res) => {
  try {
    const users = await User.find({}, { name: 1, email: 1 }).lean();
    res.json(users);
  } catch (err) {
    console.error("USERS LIST ERROR:", err);
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
