const { updateProgressBar } = require('../public/js/main');

describe('updateProgressBar', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="progressBar"></div>
      <div id="progressText"></div>
    `;
  });

  test('should update the progress bar for a non-leap year', () => {
    updateProgressBar('2023-01-01');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    expect(progressBar.style.width).toBe('0.27%');
    expect(progressBar.textContent).toBe('0.27%');
    expect(progressText.textContent).toBe('Day 1 of 365');
  });

  test('should update the progress bar for a leap year', () => {
    updateProgressBar('2024-01-01');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    expect(progressBar.style.width).toBe('0.27%');
    expect(progressBar.textContent).toBe('0.27%');
    expect(progressText.textContent).toBe('Day 1 of 366');
  });

  test('should update the progress bar for a date in the middle of the year', () => {
    updateProgressBar('2023-06-15');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    expect(progressBar.style.width).toBe('45.48%');
    expect(progressBar.textContent).toBe('45.48%');
    expect(progressText.textContent).toBe('Day 166 of 365');
  });

  test('should update the progress bar for the last day of the year', () => {
    updateProgressBar('2023-12-31');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    expect(progressBar.style.width).toBe('100.00%');
    expect(progressBar.textContent).toBe('100.00%');
    expect(progressText.textContent).toBe('Day 365 of 365');
  });
});