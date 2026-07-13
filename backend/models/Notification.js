const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "comment", "reply"],
      required: true,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
    text: { type: String },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Notification", notificationSchema);
