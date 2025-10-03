// pipeline.js
const requirementAgent = require("./agents/requirementAgent");
const wireframeAgent = require("./agents/wireframeAgent");
const codegenAgent = require("./agents/codegenAgent");
const backendAgent = require("./agents/backendAgent");
const qaAgent = require("./agents/qaAgent");
const deployAgent = require("./agents/deployAgent");

async function runPipeline(userRequirements) {
  console.log("📌 Step 1: Collecting requirements...");
  const requirements = await requirementAgent(userRequirements);

  console.log("📌 Step 2: Generating wireframe...");
  const wireframe = await wireframeAgent(requirements);

  console.log("📌 Step 3: Generating frontend code with GPT...");
  const frontendCode = await codegenAgent({ requirements, wireframe });

  console.log("📌 Step 4: Generating backend code...");
  const backendCode = await backendAgent();

  console.log("📌 Step 5: QA check...");
  await qaAgent({ frontendCode });

  console.log("📌 Step 6: Deploying to Vercel...");
  await deployAgent({ frontendCode, backendCode });
}

module.exports = { runPipeline };
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
