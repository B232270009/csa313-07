// Black-box browser probe. Does not read or modify app.js.
const fs = require('node:fs');
const path = require('node:path');
process.env.PLAYWRIGHT_BROWSERS_PATH = path.resolve(__dirname, '../.tools/playwright-browsers');
const { chromium } = require('../Lab1/my-first-test/node_modules/playwright');
const stamp = () => new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Ulaanbaatar' });
const note = (text) => {
  fs.mkdirSync(path.join(__dirname, 'evidence'), { recursive: true });
  fs.appendFileSync(path.join(__dirname, 'evidence/session-notes.txt'), `${stamp()}  ${text}\n`);
};
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1365, height: 900 } });
  const context = { page, browser, fs, path, note, stamp, root: __dirname };
  try {
    await page.goto('http://localhost:3000');
    const run = new (Object.getPrototypeOf(async function () {}).constructor)(...Object.keys(context), fs.readFileSync(process.argv[2], 'utf8'));
    await run(...Object.values(context));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
