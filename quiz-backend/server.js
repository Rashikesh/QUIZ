const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.8.4"]);

// Middleware pipelines
app.use(cors());
app.use(express.json());
// Route point
app.use("/api/auth", require("./routes/auth"));
app.use("/api/quiz", require("./routes/quiz"));
//Url Shotrener
app.use("/", require("./routes/shortener"));

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connection established successfully."))
  .catch((err) => {
    console.error("Database connection crash error:", err);
    console.log(
      "👉 Network Tip: If it says ENOTFOUND, your local WiFi is blocking SRV records. Let me know so we can apply the fallback link!",
    );
  });

// Test Endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend API is up and running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
