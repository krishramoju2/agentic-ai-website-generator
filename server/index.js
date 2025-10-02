// (Backend API / Orchestrator)
// Note: an express server that receives user input from the dashboard,
// runs the generator pipeline, and returns status & the live URL.
// ===============================
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { runPipeline } = require("../pipeline"); // relative when you split files
const app = express();

app.use(cors());
app.use(bodyParser.json());

// POST /generate
// Body: { siteName, requirements, wireframeStyle, designTheme, deploymentPlatform, includeBackend, database, authRequired }
app.post("/generate", async (req, res) => {
  try {
    const input = req.body;
    // start pipeline
    const result = await runPipeline(input);
    res.json({ success: true, message: "Site generation started", result });
  } catch (err) {
    console.error("Pipeline error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/health", (_, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
