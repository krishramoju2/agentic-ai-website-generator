
// Generate backend (Express API)
const fse = require("fs-extra");
const path = require("path");

async function generateBackend({ jobDir, siteName, database = "MongoDB", authRequired = false }) {
  const backendDir = path.join(jobDir, "server");
  await fse.ensureDir(backendDir);

  await fse.writeJson(path.join(backendDir, "package.json"), {
    name: `${siteName.toLowerCase().replace(/\s+/g, "-")}-api`,
    version: "1.0.0",
    main: "index.js",
    scripts: { start: "node index.js" },
    dependencies: { express: "^4.18.2", cors: "^2.8.5" }
  }, { spaces: 2 });

  const authRoute = authRequired ? `app.post("/api/login",(req,res)=>res.json({token:"demo-token"}));` : "";

  fse.writeFileSync(path.join(backendDir, "index.js"), `
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/status", (req,res)=>res.json({status:"ok"}));
${authRoute}
app.listen(4000, ()=>console.log("Backend on 4000"));
`);
  return backendDir;
}
module.exports = { generateBackend };
