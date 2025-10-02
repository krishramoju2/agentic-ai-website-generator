# Agentic Website Generator

This project scaffolds a platform that:
- Accepts user preferences
- Generates a React + Tailwind frontend
- Optionally adds an Express backend
- Runs QA tests
- Deploys to providers like Vercel/Netlify

## Quick start
```bash
npm install express fs-extra openai
export OPENAI_API_KEY="sk-..."
export VERCEL_TOKEN="vercel_..."
node server/index.js
