const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const verifyToken = require("../middleware/authMiddleware").verifyToken;
dotenv.config();

const router = express.Router();
const ADMIN_EMAILS = [
  "admin@example.com",
  "tanmay@company.com",
  "a11@g.com",
  "a12@g.com",
]; // whitelist

// ✅ Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register Endpoint
router.post("/register", async (req, res) => {
  console.log("Request body:", req.body); // Check if data is being received
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    let finalRole = "employee";
    if (ADMIN_EMAILS.includes(email)) finalRole = "admin";
    else if (role === "manager") finalRole = "manager"; // only allow if explicitly set
    // role = ADMIN_EMAILS.includes(email) ? "admin" : "user";
    const newUser = new User({
      role: finalRole,
      username,
      email,
      password,
    });

    const savedUser = await newUser.save();
    const token = generateToken(savedUser); // ✅ define token before using
    // Set cookie before sending JSON response
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production with HTTPS
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        token,
        user: {
          id: savedUser._id,
          name: savedUser.username,
          email: savedUser.email,
          role: savedUser.role,
        },
      });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already registered" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
});

// Login Endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Invalid credentials", redirect: "/register" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user); // ✅ define it before using

    //   return success response
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // set to true in production with HTTPS
        sameSite: "Lax", // or "None" if using cross-origin
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({
        token,
        user: {
          id: user._id,
          name: user.username,
          email: user.email,
          role: user.role,
        },
      });
    console.log("Sending user data:", {
      // token,
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
  console.log(users);
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS in production
    sameSite: "Lax",
  });

  return res.status(200).json({ message: "Logout successful" });
});

module.exports = router;