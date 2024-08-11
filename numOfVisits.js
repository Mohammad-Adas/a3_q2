const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

app.get('/', (req, res) => {
    let visitCount = req.cookies.visitCount ? parseInt(req.cookies.visitCount) : 0;
    let lastVisit = req.cookies.lastVisit ? new Date(req.cookies.lastVisit) : null;

    visitCount += 1;
    res.cookie('visitCount', visitCount, { maxAge: 1000 * 60 * 60 * 24 * 365 }); // 1 year expiration
    res.cookie('lastVisit', new Date().toISOString(), { maxAge: 1000 * 60 * 60 * 24 * 365 });

    if (visitCount === 1) {
        res.send('Welcome to my webpage! It is your first time that you are here.');
    } else {
        let lastVisitMsg = lastVisit
            ? `Last time you visited my webpage on: ${lastVisit.toDateString()} ${lastVisit.toTimeString()}`
            : '';
        res.send(`Hello, this is the ${visitCount} time that you are visiting my webpage. ${lastVisitMsg}`);
    }
});

// Start the server
app.listen(4000, () => {
    console.log('Server running on port 4000');
});
