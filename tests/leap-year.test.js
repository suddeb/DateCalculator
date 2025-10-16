const { updateLeapYearMessage } = require('../public/js/leap-year');

describe('updateLeapYearMessage', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="leapYearMessage" class="hidden"></div>
    `;
  });

  test('should show the leap year message for a leap year', () => {
    updateLeapYearMessage('2024-01-01');
    const leapYearMessage = document.getElementById('leapYearMessage');
    expect(leapYearMessage.classList.contains('hidden')).toBe(false);
  });

  test('should hide the leap year message for a non-leap year', () => {
    updateLeapYearMessage('2023-01-01');
    const leapYearMessage = document.getElementById('leapYearMessage');
    expect(leapYearMessage.classList.contains('hidden')).toBe(true);
  });
});
