// agents/backendAgent.js
async function backendAgent() {
  return `
    const express = require("express");
    const app = express();
    app.use(express.json());

    app.post("/contact", (req,res) => {
      console.log("Message received:", req.body);
      res.json({ status: "success" });
    });

    module.exports = app;
  `;
}

module.exports = backendAgent;
