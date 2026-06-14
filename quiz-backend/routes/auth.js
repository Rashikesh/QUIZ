const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // 👈 Added for JWT token generation
const User = require("../models/User");

// 1. REGISTER ENDPOINT (Your existing logic)
router.post("/register", async (req, res) => {
  try {
    const { name, email, pass } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already registered with this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    res.status(500).json({ message: "Server compilation database error" });
  }
});

// 2. LOGIN ENDPOINT (Missing JWT creation flow - Add this now)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // Compare input password with the encrypted hash string
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // Define the token payload data signature
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };

    // Sign and generate the JWT Token (Valid for 24 hours)
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        // Return the token payload back to your Next.js client app
        res.json({
          token,
          user: { id: user.id, name: user.name, role: user.role },
        });
      },
    );
  } catch (err) {
    res.status(500).json({ message: "Server login processing error" });
  }
});

module.exports = router;
