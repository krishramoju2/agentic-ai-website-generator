// (Generate a minimal React + Tailwind app inside jobDir/client)
// - writes package.json, Vite config, index.html, src main files, and components
// - returns the siteDir (client path) for build & deploy
// ===============================
const fsExtra = require("fs-extra");

async function generateReactComponents({ jobDir, wireframe, siteName, designTheme }) {
  const clientDir = path.join(jobDir, "client");
  await fsExtra.ensureDir(clientDir);
  // package.json
  await fsExtra.writeJson(path.join(clientDir, "package.json"), {
    name: siteName.toLowerCase().replace(/\s+/g, "-"),
    private: true,
    scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
    dependencies: { react: "^18.2.0", "react-dom": "^18.2.0", "react-router-dom": "^6.15.0", axios: "^1.4.0" },
    devDependencies: { vite: "^5.0.0", tailwindcss: "^3.5.0", autoprefixer: "^10.4.14", postcss: "^8.4.21" }
  }, { spaces: 2 });
