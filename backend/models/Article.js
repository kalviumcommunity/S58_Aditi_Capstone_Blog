const mongoose = require("mongoose");

<<<<<<< HEAD
const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
=======
const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }, // keep required to match routes
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
<<<<<<< HEAD
    date: { type: Date, default: Date.now },
=======
    // ❌ remove custom 'date'; rely on timestamps' createdAt/updatedAt
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
  },
  { timestamps: true }
);

<<<<<<< HEAD
=======
// Optional: text index for better search relevance
// NOTE: Build indexes once in dev (Mongo will build them automatically if autoIndex is true)
articleSchema.index({ title: "text", description: "text", content: "text" });

>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
module.exports = mongoose.model("Article", articleSchema);
