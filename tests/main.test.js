global.TextEncoder = require('text-encoding').TextEncoder;
global.TextDecoder = require('text-encoding').TextDecoder;
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const mainJsPath = path.resolve(__dirname, '../public/js/main.js');
const mainJsCode = fs.readFileSync(mainJsPath, 'utf8');

require('whatwg-fetch');

describe('updateProgressBar', () => {
  let dom;

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div id="progressBar"></div>
          <div id="progressText"></div>
          <div id="result"></div>
          <input type="date" id="dateInput" />
          <button id="calculateBtn"></button>
          <h2 id="progressTitle"></h2>
          <div id="leapYearMessage"></div>
        </body>
      </html>
    `, { runScripts: 'dangerously' });

    const script = dom.window.document.createElement('script');
    script.textContent = mainJsCode;
    dom.window.document.body.appendChild(script);
  });

  test('should update the progress bar for a non-leap year', () => {
    dom.window.updateProgressBar('2023-01-01');
    const progressBar = dom.window.document.getElementById('progressBar');
    const progressText = dom.window.document.getElementById('progressText');
    expect(progressBar.style.width).toBe('0.27%');
    expect(progressText.textContent).toBe('Day 1 of 365');
  });

  test('should update the progress bar for a leap year', () => {
    dom.window.updateProgressBar('2024-01-01');
    const progressBar = dom.window.document.getElementById('progressBar');
    const progressText = dom.window.document.getElementById('progressText');
    expect(progressBar.style.width).toBe('0.27%');
    expect(progressText.textContent).toBe('Day 1 of 366');
  });

  test('should update the progress bar for a date in the middle of the year', () => {
    dom.window.updateProgressBar('2023-06-15');
    const progressBar = dom.window.document.getElementById('progressBar');
    const progressText = dom.window.document.getElementById('progressText');
    expect(progressBar.style.width).toBe('45.48%');
    expect(progressText.textContent).toBe('Day 166 of 365');
  });

  test('should update the progress bar for the last day of the year', () => {
    dom.window.updateProgressBar('2023-12-31');
    const progressBar = dom.window.document.getElementById('progressBar');
    const progressText = dom.window.document.getElementById('progressText');
    expect(progressBar.style.width).toBe('100.00%');
    expect(progressText.textContent).toBe('Day 365 of 365');
  });
});