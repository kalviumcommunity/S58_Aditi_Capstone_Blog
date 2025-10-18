const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
<<<<<<< HEAD
require("./config/passport");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

=======
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

require("./config/passport");

const app = express();

// Middleware
const allowed = [process.env.CLIENT_URL, "http://localhost:5173"].filter(
  Boolean
);

app.use(
  cors({
    origin: (origin, cb) => cb(null, !origin || allowed.includes(origin)),
    credentials: true, // harmless if you don't use cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use((err, req, res, next) => {
  console.error("ERR:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const articleRoutes = require("./routes/articles");
app.use("/api/articles", articleRoutes);

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

const searchRoutes = require("./routes/search");
app.use("/api/search", searchRoutes);

<<<<<<< HEAD
=======
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("ERR:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
