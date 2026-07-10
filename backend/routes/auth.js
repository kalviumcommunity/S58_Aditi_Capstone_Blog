const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/sendEmail");

const router = express.Router();
require("../config/passport");

//sign up
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });
    await newUser.save();

    // respond immediately so the user isn't left waiting on the email
    res.status(201).json({
      message:
        "Account created. Check your email to verify your account before logging in.",
    });

    // send the email in the background (don't block the response)
    sendVerificationEmail(email, verificationToken).catch((mailErr) => {
      console.error("Failed to send verification email:", mailErr);
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(403).json({
        message:
          "Please verify your email before logging in. Check your inbox.",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Verify email
router.get("/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification link" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: "Email verified. You can now log in." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// google Oauth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(
      `${process.env.CLIENT_URL || "http://localhost:5173"}/google-success?token=${token}`,
    );
  },
);

// Get the currently logged-in user from their token
router.get("/me", require("../middleware/authMiddleware"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email _id");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
