/* eslint-env node */
require('module-alias/register');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('server/routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());

app.use('/api', routes);

let mongoDB;
if (process.env.NODE_ENV === 'production') {
    const mongoUser = process.env.MONGODB_USER;
    const mongoPassword = process.env.MONGODB_PASSWORD;
    mongoDB = `mongodb://${mongoUser}:${mongoPassword}@ds215172.mlab.com:15172/mckevins`;
} else {
    mongoDB = 'mongodb://127.0.0.1/mckevins';
}
mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => {});
