// agents/codegenAgent.js
require("dotenv").config();
const fs = require("fs");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function codegenAgent({ requirements, wireframe }) {
  const prompt = `
  Generate a full React + Tailwind page based on:
  - Site Type: ${requirements.siteType}
  - Theme: ${requirements.theme}
  - Sections: ${requirements.sections.join(", ")}
  - Tone: ${requirements.tone}
  - Animations: ${requirements.animations ? "Yes" : "No"}

  Each section should have **realistic tailored text**, 
  styled with colors & effects per theme.
  Use one main React component (App).
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [{ role: "user", content: prompt }],
  });

  const frontendCode = response.choices[0].message.content;

  fs.writeFileSync("./build/App.jsx", frontendCode);

  return frontendCode;
}

module.exports = codegenAgent;

