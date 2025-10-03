// agents/requirementAgent.js
async function requirementAgent(requirements) {
  return {
    siteType: requirements.siteType || "website",
    theme: requirements.theme || "default",
    animations: requirements.animations || false,
    sections: requirements.sections || ["Home", "About", "Contact"],
    tone: requirements.tone || "neutral"
  };
}

module.exports = requirementAgent;

