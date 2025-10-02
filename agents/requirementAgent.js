// (Requirement extraction using an LLM; fallback heuristics if LLM fails)
// ===============================
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// If you prefer not to call an LLM in dev, set FALLBACK=true to use a heuristic parser.
const USE_FALLBACK = process.env.FALLBACK === "true";

async function extractRequirements(userText) {
  if (!userText || userText.trim().length === 0) {
    return { functional: ["Home", "About"], nonFunctional: ["bg-white text-black"] };
  }

  if (USE_FALLBACK) {
    // Very small heuristic extractor
    const lower = userText.toLowerCase();
    const pages = [];
    ["home", "about", "contact", "blog", "projects", "gallery", "pricing", "booking"].forEach(p => {
      if (lower.includes(p)) pages.push(capitalize(p));
    });
    if (pages.length === 0) pages.push("Home", "About");
    const theme = lower.includes("dark") ? ["bg-gray-900 text-white"] : lower.includes("pastel") ? ["bg-pink-100 text-gray-800"] : ["bg-white text-black"];
    return { functional: pages, nonFunctional: theme };
  }

  const prompt = `You are an assistant that extracts website requirements.
Input: """${userText}"""
Return a JSON object with keys:
{ "functional": ["list","of","pages/components"], "nonFunctional": ["theme classes or descriptions"] }
Return ONLY valid JSON.`;
  try {
    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      max_tokens: 500
    });
    const content = resp.choices && resp.choices[0] && resp.choices[0].message && resp.choices[0].message.content;
    const parsed = JSON.parse(content);
    // normalize
    parsed.functional = parsed.functional || [];
    parsed.nonFunctional = parsed.nonFunctional || [];
    return parsed;
  } catch (err) {
    console.warn("LLM parse error; falling back to heuristics:", err?.message || err);
    // fallback heuristic:
    return extractRequirementsFallback(userText);
  }
}

function extractRequirementsFallback(userText) {
  const lower = userText.toLowerCase();
  const pages = [];
  ["home", "about", "contact", "blog", "projects", "gallery", "pricing", "booking"].forEach(p => {
    if (lower.includes(p)) pages.push(capitalize(p));
  });
  if (pages.length === 0) pages.push("Home", "About");
  const theme = lower.includes("dark") ? ["bg-gray-900 text-white"] : lower.includes("pastel") ? ["bg-pink-100 text-gray-800"] : ["bg-white text-black"];
  return { functional: pages, nonFunctional: theme };
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

module.exports = { extractRequirements };
