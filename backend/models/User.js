const mongoose = require("mongoose");

<<<<<<< HEAD
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  bio: { type: String },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  date: { type: Date, default: Date.now },
=======
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true, // ✅ this is enough
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: { type: String, select: false },
    googleId: { type: String, index: true },
    bio: { type: String, trim: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// ✅ Keep only this search index
userSchema.index({ name: "text", email: "text" });

userSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});
userSchema.set("toObject", {
  versionKey: false,
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
});

module.exports = mongoose.model("User", userSchema);
