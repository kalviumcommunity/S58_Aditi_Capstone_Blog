<<<<<<< HEAD
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
=======
// config/passport.js
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const API_URL = process.env.API_URL || "http://localhost:5000"; // your backend base
const GOOGLE_CALLBACK =
  process.env.GOOGLE_CALLBACK_URL || `${API_URL}/api/auth/google/callback`;

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn(
    "⚠️ Google OAuth env vars missing. Set GOOGLE_CLIENT_ID/SECRET."
  );
}
if (!process.env.JWT_SECRET) {
  console.warn("⚠️ JWT_SECRET is not set. Tokens will fail verification.");
}
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
<<<<<<< HEAD
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
=======
      callbackURL: GOOGLE_CALLBACK, // use full URL; must match Google Cloud console
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email =
          (profile.emails && profile.emails[0] && profile.emails[0].value) ||
          "";
        const emailLower = email.trim().toLowerCase();

        // 1) Try existing Google user
        let user = await User.findOne({ googleId: profile.id });

        // 2) If not found, try linking to an existing email user (avoid duplicate accounts)
        if (!user && emailLower) {
          user = await User.findOne({ email: emailLower });
          if (user && !user.googleId) {
            user.googleId = profile.id;
            // If the user had no name (edge case), set it from Google
            if (!user.name && profile.displayName)
              user.name = profile.displayName;
            await user.save();
          }
        }

        // 3) If still not found, create a new user
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName || emailLower.split("@")[0] || "User",
            email: emailLower || undefined, // some google accounts can hide email; allow undefined
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
          });
          await user.save();
        }

<<<<<<< HEAD
=======
        // 4) Sign JWT
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

<<<<<<< HEAD
        // ✅ Pass both user and token manually to callback
        done(null, { user, token });
      } catch (err) {
        done(err, false);
=======
        // Pass both to the callback handler in routes/auth.js
        return done(null, { user, token });
      } catch (err) {
        console.error("GoogleStrategy ERROR:", err);
        return done(err, false);
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
      }
    }
  )
);
<<<<<<< HEAD
=======

// If you ever enable sessions (not needed with JWT), add serialize/deserialize
// passport.serializeUser((user, done) => done(null, user._id));
// passport.deserializeUser(async (id, done) => { const u = await User.findById(id); done(null, u); });

module.exports = passport;
>>>>>>> 094d29a (Disabled author likes, added Author badge in comments)
