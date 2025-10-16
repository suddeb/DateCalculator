const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/api/days', (req, res) => {
    const { date } = req.query;
    if (!date) {
        return res.status(400).json({ error: 'Date query parameter is required' });
    }

    const inputDate = new Date(date + 'T00:00:00Z');
    if (isNaN(inputDate)) {
        return res.status(400).json({ error: 'Invalid date format. Please use YYYY-MM-DD.' });
    }

    const year = inputDate.getUTCFullYear();
    const endOfYear = new Date(Date.UTC(year, 11, 31));

    const diffTime = endOfYear.getTime() - inputDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;

    res.json({ daysLeft: diffDays });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
