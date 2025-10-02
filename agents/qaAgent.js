// Generate Playwright smoke tests
const fsPromises = require("fs").promises;
const path = require("path");

async function generateTests({ jobDir, pages = [] }) {
  const testsDir = path.join(jobDir, "tests");
  await fsPromises.mkdir(testsDir, { recursive: true });
  const testCode = `
const { test, expect } = require('@playwright/test');
const pages = ${JSON.stringify(pages)};
test('navigation smoke', async ({ page }) => {
  await page.goto(process.env.TEST_SITE_URL || 'http://localhost:5173');
  for (const p of pages) {
    await page.click('text=' + p);
    await page.waitForTimeout(200);
  }
});
`;
  await fsPromises.writeFile(path.join(testsDir, "navigation.spec.js"), testCode, "utf8");
  return testsDir;
}
module.exports = { generateTests };

