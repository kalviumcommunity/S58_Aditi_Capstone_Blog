const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false, // 🔐 Prevents password from being returned in queries
  },
  googleId: {
    type: String,
  },
  bio: {
    type: String,
    default: "",
    trim: true,
    maxlength: 200,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", userSchema);
