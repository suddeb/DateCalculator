
function updateLeapYearMessage(dateString) {
    const date = new Date(dateString + 'T00:00:00Z');
    const year = date.getUTCFullYear();
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const leapYearMessage = document.getElementById('leapYearMessage');
    if (isLeap) {
        leapYearMessage.classList.remove('hidden');
    } else {
        leapYearMessage.classList.add('hidden');
    }
}

module.exports = { updateLeapYearMessage };
