const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const authenticateToken = require("../middleware/authMiddleware");

// Get the current user's notifications (newest first)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user.id })
      .populate("sender", "name")
      .populate("article", "title")
      .sort({ createdAt: -1 })
      .limit(30);

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark all of the current user's notifications as read
router.put("/read", authenticateToken, async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, read: false },
      { $set: { read: true } },
    );
    res.json({ message: "Notifications marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
