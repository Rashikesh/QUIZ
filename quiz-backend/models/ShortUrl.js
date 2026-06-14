const mongoose = require("mongoose");

const ShortUrlSchema = new mongoose.Schema(
  {
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ShortUrl", ShortUrlSchema);
