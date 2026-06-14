// Central URL router config switch
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://quiz-57d7.onrender.com" // 👈 Paste your real Render URL here (keep the /api at the end)
    : "http://localhost:5000/api";

export default API_BASE_URL;
