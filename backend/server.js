const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
require("./config/passport");

dotenv.config();
const app = express;

//middleware
app.request(express.json());
app.use(cors());
app.use(passport.initialize());

//Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const articleRoutes = require("./routes/articles");
app.use("api/article", articleRoutes);

const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

const searchRoutes = require("./routes/search");
app.use("/api/search", searchRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);

//MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
