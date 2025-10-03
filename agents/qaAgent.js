// agents/qaAgent.js
async function qaAgent({ frontendCode }) {
  if (!frontendCode.includes("function") && !frontendCode.includes("const App")) {
    throw new Error("❌ QA Failed: No React component detected");
  }
  console.log("✅ QA Passed: Frontend code looks valid.");
  return true;
}

module.exports = qaAgent;


