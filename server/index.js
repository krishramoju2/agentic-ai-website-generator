// server/index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const { runPipeline } = require("../pipeline"); // Correct import

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Main generate endpoint
app.post("/generate", async (req, res) => {
  try {
    const input = req.body;
    const result = await runPipeline(input);
    res.json({ success: true, data: result });
  } catch (err) {
    console.error("Error in /generate:", err);
    res.status(500).json({ success: false, message: err.message, err });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
