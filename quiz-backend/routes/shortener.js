const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const ShortUrl = require("../models/ShortUrl");

// 1. POST Endpoint: Create a short URL code
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl)
      return res.status(400).json({ message: "Missing target URL link" });

    // Look up if this exact link has already been shortened to save space
    let urlEntry = await ShortUrl.findOne({ originalUrl });
    if (urlEntry) {
      return res.json({
        shortUrl: `http://localhost:5000/r/${urlEntry.shortCode}`,
      });
    }

    // Generate a unique 6-character random token string code
    const shortCode = crypto.randomBytes(3).toString("hex");

    urlEntry = new ShortUrl({ originalUrl, shortCode });
    await urlEntry.save();

    res.status(201).json({ shortUrl: `http://localhost:5000/r/${shortCode}` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal shortener link processing error" });
  }
});

// 2. GET Endpoint: Redirect short links to the original long path
router.get("/r/:code", async (req, res) => {
  try {
    const urlEntry = await ShortUrl.findOne({ shortCode: req.params.code });
    if (!urlEntry)
      return res.status(404).send("<h1>Error 404: Link Not Found</h1>");

    // Increment click count for internal tracking analytics metrics
    urlEntry.clicks++;
    await urlEntry.save();

    // Redirect the browser straight to your Next.js frontend application path
    res.redirect(urlEntry.originalUrl);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
