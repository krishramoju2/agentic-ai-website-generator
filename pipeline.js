// (Orchestrator that synchronizes agents; single-threaded, each step waits for the previous)
// ===============================
const path = require("path");
const { extractRequirements } = require("./agents/requirementAgent");
const { generateWireframe } = require("./agents/wireframeAgent");
const { generateReactComponents } = require("./agents/codegenAgent");
const { generateBackend } = require("./agents/backendAgent");
const { generateTests } = require("./agents/qaAgent");
const { deploySite } = require("./agents/deployAgent");

/**
 * runPipeline(userInput)
 * userInput: {
 *   siteName,
 *   requirements,
 *   wireframeStyle,
 *   designTheme,
 *   deploymentPlatform,
 *   includeBackend,
 *   database,
 *   authRequired
 * }
 * Returns an object with job metadata (jobDir, liveUrl if deploy completed synchronously).
 */
async function runPipeline(userInput) {
  const jobId = `job-${Date.now()}`;
  const jobDir = path.resolve(process.cwd(), "generated", jobId);
  fs.mkdirSync(jobDir, { recursive: true });

  // 1) Requirements extraction
  const reqs = await extractRequirements(userInput.requirements);

  // 2) Wireframe generation (user style + extracted reqs)
  const wireframe = generateWireframe(reqs, userInput.wireframeStyle);

  // 3) Generate frontend code (React + Tailwind skeleton) into jobDir/client
  const siteDir = await generateReactComponents({
    jobDir,
    wireframe,
    siteName: userInput.siteName,
    designTheme: userInput.designTheme
  });

  // 4) Optional backend generation (MERN)
  if (userInput.includeBackend) {
    await generateBackend({ jobDir, siteName: userInput.siteName, reqs, database: userInput.database, authRequired: userInput.authRequired });
  }

  // 5) Generate QA tests (Playwright) tailored to pages
  generateTests({ jobDir, pages: reqs.functional });

  // 6) Deploy (start deploy; may be synchronous or asynchronous depending on platform)
  const deployInfo = await deploySite({ siteDir, platform: userInput.deploymentPlatform });

  // Return job metadata (including deploy URL if available)
  return {
    jobId,
    jobDir,
    reqs,
    wireframe,
    siteDir,
    deployInfo
  };
}

module.exports = { runPipeline };
