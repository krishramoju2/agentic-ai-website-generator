
# Agentic Website Generator

This project scaffolds a platform that:
- Accepts user preferences
- Generates a React + Tailwind frontend
- Optionally adds an Express backend
- Runs QA tests
- Deploys to providers like Vercel

## Quick start
```bash
npm install express fs-extra openai cors
export HF_API_TOKEN=""
export VERCEL_TOKEN="vercel_..."
node server/index.js
