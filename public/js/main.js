document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const dateInput = document.getElementById('dateInput');
    const resultDiv = document.getElementById('result');

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const progressTitle = document.querySelector('h2');

    function updateProgressBar(dateString) {
        const date = new Date(dateString + 'T00:00:00Z');
        const year = date.getUTCFullYear();

        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        const totalDaysInYear = isLeapYear ? 366 : 365;

        const startOfYear = new Date(Date.UTC(year, 0, 1));
        const daysPassed = (date - startOfYear) / (1000 * 60 * 60 * 24) + 1;
        const progressPercentage = (daysPassed / totalDaysInYear) * 100;

        progressBar.style.width = `${progressPercentage.toFixed(2)}%`;
        progressBar.textContent = `${progressPercentage.toFixed(2)}%`;
        progressText.textContent = `Day ${Math.floor(daysPassed)} of ${totalDaysInYear}`;
    }

    // Set default date to today and update progress bar
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    dateInput.value = todayString;
    updateProgressBar(todayString);

    calculateBtn.addEventListener('click', () => {
        const date = dateInput.value;
        if (date) {
            fetch(`/api/days?date=${date}`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        resultDiv.textContent = data.error;
                    } else {
                        resultDiv.textContent = `${data.daysLeft} days left in the year.`;
                        updateProgressBar(date);
                        progressTitle.textContent = `Progress in ${new Date(date + 'T00:00:00Z').getUTCFullYear()}`;
                    }
                });
        }
    });
});