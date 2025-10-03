// agents/deployAgent.js
require("dotenv").config();
const fs = require("fs");

async function deployAgent({ frontendCode }) {
  fs.writeFileSync("./build/App.jsx", frontendCode);

  console.log("🚀 Deploying to Vercel...");

  const response = await fetch("https://api.vercel.com/v13/deployments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "auto-generated-site",
      files: [
        {
          file: "App.jsx",
          data: frontendCode,
        },
      ],
    }),
  });

  const result = await response.json();

  if (result.url) {
    console.log(`✅ Deployed: https://${result.url}`);
  } else {
    console.error("❌ Deployment failed:", result);
  }
}

module.exports = deployAgent;


