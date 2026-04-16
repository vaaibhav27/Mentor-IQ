const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 5000 });
    console.log('HTML:', await page.content());
    await browser.close();
  } catch(e) {
    console.error('Puppeteer error:', e);
    process.exit(1);
  }
})();
