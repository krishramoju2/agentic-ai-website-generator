d9OQtabjVPSPyVtcPSgeouVr vercel
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 open api

# Agentic Website Generator

This project scaffolds a platform that:
- Accepts user preferences
- Generates a React + Tailwind frontend
- Optionally adds an Express backend
- Runs QA tests
- Deploys to providers like Vercel/Netlify

## Quick start
```bash
npm install express fs-extra openai cors
export OPENAI_API_KEY="sk-..."
export VERCEL_TOKEN="vercel_..."
node server/index.js
