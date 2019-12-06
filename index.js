require ("babel-polyfill");

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const motivator = require('./models/motivator')
const timeout = require('connect-timeout');

app.use(timeout('5s'));
app.use(haltOnTimedout);

function haltOnTimedout (req, res, next) {
    if (!req.timedout) next();
}

app.get('/', (req, res) => {
    motivator.get().then((motivation) => {
        if (motivation) {
            res.send({
                "response_type": "in_channel",
                "text": `${motivation}`,
            });
        } else {
            res.send({
                "response_type": "in_channel",
                "text": `We are busy doing other stuff you piece of shit!`,
            });
        }
    });
});

app.post('/motivation', (req, res) => {
    motivator.get().then((motivation) => {
        if (motivation) {
            res.send({
                "response_type": "in_channel",
                "text": `${motivation}`,
            });
        } else {
            res.send({
                "response_type": "in_channel",
                "text": `We are busy doing other stuff you piece of shit!`,
            });
        }
    });
});

app.use((err, req, res, next) => {
    if (err.error){
        res.status(err.error.status || 500)
    }
    res.json(err);
});

app.listen(port, () => console.log('Magic is happening on ' + port));
