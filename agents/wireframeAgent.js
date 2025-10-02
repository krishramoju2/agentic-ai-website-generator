// (Create wireframe blueprint depending on user chosen style)
// ===============================
function generateWireframe(reqs, style) {
  const { functional = [], nonFunctional = [] } = reqs || {};
  let layout = {};
  switch (style) {
    case "grid with sidebar":
      layout = { header: functional, body: ["sidebar", "grid content"], footer: ["contact", "social"] };
      break;
    case "top-nav with cards":
      layout = { header: functional, body: ["hero", "cards"], footer: ["links"] };
      break;
    case "landing page style":
      layout = { header: functional, body: ["hero", "features", "cta"], footer: ["legal", "contact"] };
      break;
    case "portfolio style":
      layout = { header: functional, body: ["projects gallery", "about"], footer: ["contact"] };
      break;
    default:
      layout = { header: functional, body: ["sections"], footer: ["contact"] };
  }
  return { ...layout, theme: nonFunctional.join(" ") || "bg-white text-black" };
}

module.exports = { generateWireframe };

