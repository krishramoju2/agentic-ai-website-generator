// Generate React + Tailwind frontend
const fsExtra = require("fs-extra");
const path = require("path");

async function generateReactComponents({ jobDir, wireframe, siteName, designTheme }) {
  const clientDir = path.join(jobDir, "client");
  await fsExtra.ensureDir(clientDir);

  await fsExtra.writeJson(path.join(clientDir, "package.json"), {
    name: siteName.toLowerCase().replace(/\s+/g, "-"),
    private: true,
    scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
    dependencies: { react: "^18.2.0", "react-dom": "^18.2.0", "react-router-dom": "^6.15.0", axios: "^1.4.0" },
    devDependencies: { vite: "^5.0.0", tailwindcss: "^3.5.0", autoprefixer: "^10.4.14", postcss: "^8.4.21" }
  }, { spaces: 2 });

  fsExtra.writeFileSync(path.join(clientDir, "index.html"), `
<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${siteName}</title></head>
<body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body>
</html>`);

  await fsExtra.ensureDir(path.join(clientDir, "src"));
  fsExtra.writeFileSync(path.join(clientDir, "src", "index.css"), `@tailwind base; @tailwind components; @tailwind utilities; body { min-height: 100vh; }`);
  fsExtra.writeFileSync(path.join(clientDir, "src", "main.jsx"), `
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
createRoot(document.getElementById("root")).render(<App />);
`);

  const headerItems = (wireframe.header || []).map(h => `<a href="#${slugify(h)}">${h}</a>`).join(" | ");
  const bodySections = (wireframe.body || []).map(s => `<section id="${slugify(s)}"><h2>${s}</h2></section>`).join("\n");

  fsExtra.writeFileSync(path.join(clientDir, "src", "App.jsx"), `
import React from "react";
export default function App(){
  return (
    <div className="${designTheme || wireframe.theme}">
      <header>${siteName} | ${headerItems}</header>
      <main>${bodySections}</main>
      <footer>© ${new Date().getFullYear()} ${siteName}</footer>
    </div>
  );
}`);
  fsExtra.writeFileSync(path.join(clientDir, "tailwind.config.cjs"), `module.exports = { content: ["./index.html","./src/**/*.{js,jsx}"], theme: { extend: {} }, plugins: [] }`);
  return clientDir;
}
function slugify(s) { return s.toLowerCase().replace(/\s+/g, "-"); }
module.exports = { generateReactComponents };

