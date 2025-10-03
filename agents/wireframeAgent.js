// agents/wireframeAgent.js
async function wireframeAgent({ siteType, sections }) {
  return {
    layout: "grid",
    header: true,
    footer: true,
    sections: sections.map((section) => ({
      name: section,
      type: "content",
    })),
  };
}

module.exports = wireframeAgent;


