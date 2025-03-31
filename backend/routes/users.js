const express = require("express");
const User = require("../models/User");
const Article = require("../models/Article");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get User Profile & Their Articles
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("followers", "name")
      .populate("following", "name")
      .lean(); // 🔄 Optional optimization for read performance

    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Fetch articles written by this user with populated author name
    const articles = await Article.find({ author: req.params.id }).populate(
      "author",
      "name"
    );

    res.json({ user, articles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Follow a User
router.post("/:id/follow", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Prevent self-follow
    if (id.toString() === req.user.id.toString()) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

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
    res.status(500).json({ message: err.message });
  }
});

// ✅ Unfollow a User
router.post("/:id/unfollow", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Prevent self-unfollow
    if (id.toString() === req.user.id.toString()) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

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
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
