const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const QuizResult = require("../models/QuizResult");

// 🛠️ FIX: Explicitly name the validation function to match your route mounts
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer TOKEN"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied: Missing Session Tokens" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or Expired Session Token" });
  }
};

// 1. POST Endpoint to save scores
router.post("/save-score", authenticateToken, async (req, res) => {
  try {
    const { score, totalQuestions, category, difficulty } = req.body;

    const newResult = new QuizResult({
      userId: req.user.id,
      score,
      totalQuestions,
      category,
      difficulty,
    });

    await newResult.save();
    res
      .status(201)
      .json({ message: "Quiz historical record saved successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal processing database mapping error" });
  }
});

// 2. GET Endpoint to fetch live historical scores for the logged-in user
router.get("/my-history", authenticateToken, async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.user.id }).sort({
      createdAt: -1,
    }); // Newest records first

    res.json(results);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving database scorecard metrics." });
  }
});

module.exports = router;
