require ("babel-polyfill");

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const frank = require('./controllers/frank');
const timeout = require('connect-timeout');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(timeout('5s'));
app.use(haltOnTimedout);
app.use(cors());

function haltOnTimedout (req, res, next) {
    if (!req.timedout) next();
}

app.get('/api/frank-fact', (req, res) => {
    frank.getFrankFact().then((frankFact) => {
        res.send(frankFact);
    })
});

app.post('/api/frank-fact', (req, res) => {
    frank.createFrankFact(req.body).then(() => {
        res.send("Success");
    });
});

app.use((err, req, res, next) => {
    res.status(err.error.status || 500);
    res.json(err);
});

app.use((req, res, next) => {
    res.status(404).json({
        error: {
            status: 404,
            message: 'Ooops, not found!'
        }
    });
});

app.listen(port, () => console.log('Magic is happening on ' + port));
