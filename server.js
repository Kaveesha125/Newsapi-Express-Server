require("dotenv").config(); // Load environment variables
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 1234;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.use(express.static("public")); // Serve static files from 'public' folder

app.get("/api/news", async (req, res) => {
  const query = req.query.q || "technology"; // Default to "technology" if no query provided
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    query
  )}&apiKey=${NEWS_API_KEY}`;
  try {
    console.log("Fetching from:", url);
    console.log("Search query:", query);
    const response = await fetch(url);
    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Articles found:", data.articles ? data.articles.length : 0);
    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch news", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
