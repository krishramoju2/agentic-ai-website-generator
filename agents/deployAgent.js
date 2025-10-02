// Deployment agent
const { exec } = require("child_process");

function runCmd(cmd, cwd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd, maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
      if (err) return reject({ err, stdout, stderr });
      resolve({ stdout, stderr });
    });
  });
}

async function deploySite({ siteDir, platform }) {
  await runCmd("npm ci", siteDir);
  await runCmd("npm run build", siteDir);

  if (platform === "Vercel") {
    const { stdout } = await runCmd(`npx vercel --prod --token=${process.env.VERCEL_TOKEN} --confirm`, siteDir);
    const urlMatch = stdout.match(/https?:\/\/[^\s]+/);
    return { success: true, platform, liveUrl: urlMatch ? urlMatch[0] : null };
  }
  if (platform === "Netlify") {
    const { stdout } = await runCmd("npx netlify deploy --prod --dir=dist", siteDir);
    const urlMatch = stdout.match(/https?:\/\/[^\s]+/);
    return { success: true, platform, liveUrl: urlMatch ? urlMatch[0] : null };
  }
  return { success: false, error: "Unsupported platform" };
}

module.exports = { deploySite };

