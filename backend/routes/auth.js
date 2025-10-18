<<<<<<< HEAD
=======
// routes/auth.js
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();
require("../config/passport");

<<<<<<< HEAD
//sign up
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exits" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });
=======
// Ensure secret exists early (fail fast at startup)
if (!process.env.JWT_SECRET) {
  console.warn("⚠️ JWT_SECRET is not set. Tokens will fail at runtime.");
}

// Helper: build a safe user payload (never return password)
const toSafeUser = (u) => {
  if (!u) return null;
  const { _id, name, email, followers, following, createdAt, updatedAt } =
    u.toObject ? u.toObject() : u;
  return { _id, name, email, followers, following, createdAt, updatedAt };
};

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email, and password are required" });
    }

    const emailLower = String(email).trim().toLowerCase();
    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name: name.trim(),
      email: emailLower,
      password: hashedPassword,
    });
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
<<<<<<< HEAD

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exits" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
=======
    return res.status(201).json({ user: toSafeUser(newUser), token });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    // Validation errors should be 400, not 500
    const code = err.name === "ValidationError" ? 400 : 500;
    return res
      .status(code)
      .json({ message: err.message || "Something went wrong" });
  }
});

// LOGIN (email/password)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const emailLower = String(email).trim().toLowerCase();
    const user = await User.findOne({ email: emailLower });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
<<<<<<< HEAD

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// google Oauth Routes
=======
    return res.status(200).json({ user: toSafeUser(user), token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// GOOGLE OAUTH
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

<<<<<<< HEAD
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`http://localhost:5173/google-success?token=${token}`);
  }
);
=======
router.get("/google/callback", (req, res, next) => {
  // Let’s make sure passport errors don’t bubble as 500s
  passport.authenticate("google", { session: false }, (err, data) => {
    if (err || !data) {
      console.error("GOOGLE OAUTH ERROR:", err);
      const failureUrl =
        (process.env.CLIENT_URL || "http://localhost:5173") + "/google-failure";
      return res.redirect(failureUrl);
    }
    // data is what we passed in done(null, { user, token }) from config/passport
    const { token } = data;
    const client = process.env.CLIENT_URL || "http://localhost:5173";
    const redirectUrl = `${client}/google-success?token=${encodeURIComponent(
      token
    )}`;
    return res.redirect(redirectUrl);
  })(req, res, next);
});
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)

module.exports = router;
