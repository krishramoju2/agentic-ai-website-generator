// agents/codegenAgent.js
require("dotenv").config();
const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HF_API_TOKEN);

/**
 * Generate frontend content using Hugging Face model
 */
async function codegenAgent({ wireframe, theme, colors, effects, content }) {
  // Prepare prompt for HF
  const prompt = `
Generate website HTML/React content based on the following:
- Sections: ${wireframe.map(s => s.type).join(", ")}
- Theme: ${theme.background}, colors: primary=${colors.primary}, secondary=${colors.secondary}
- Effects: ${effects.container}
- Content: ${content}
`;

  // Call Hugging Face text-generation model
  const output = await hf.textGeneration({
    model: "gpt2", // or any HF hosted model
    inputs: prompt,
    parameters: {
      max_new_tokens: 800,
      temperature: 0.7
    }
  });

  // Take generated text
  const generated = output?.generated_text || "// fallback content";

  // Wrap in App.jsx
  const appCode = `
import React from "react";
export default function App() {
  return (
    <div className="${theme.background}">
      ${generated}
    </div>
  );
}
  `;
  return appCode;
}

module.exports = codegenAgent;

