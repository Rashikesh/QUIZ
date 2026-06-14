const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const QuizResult = require("../models/QuizResult");

// Middleware helper to decode token strings
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Access Denied: Missing Authorization Session Tokens" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (err) {
    res
      .status(400)
      .json({ message: "Invalid Session Profile Token Verification" });
  }
};

// POST Endpoint to save scores
router.post("/save-score", verifyToken, async (req, res) => {
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

// GET Endpoint to fetch live historical scores for the logged-in user
router.get("/my-history", authenticateToken, async (req, res) => {
  try {
    // Queries the collection for records matching the authenticated user's ID
    const results = await QuizResult.find({ userId: req.user.id }).sort({
      createdAt: -1,
    }); // Sorts by date in descending order (Newest first)

    res.json(results);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving database scorecard metrics." });
  }
});

module.exports = router;
