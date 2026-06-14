const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("QuizResult", QuizResultSchema);
