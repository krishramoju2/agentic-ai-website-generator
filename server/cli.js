// cli.js
require("dotenv").config();
const { runPipeline } = require("../pipeline");

const userRequirements = {
  siteType: "portfolio",
  theme: "dark neon",
  animations: true,
  sections: ["About Me", "Projects", "Contact"],
  tone: "professional but friendly"
};

runPipeline(userRequirements);
