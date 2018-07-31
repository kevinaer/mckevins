require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());

app.use('/api', routes);

const mongoDB = 'mongodb://127.0.0.1/mckevins';
mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection mishap :( :'));

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));