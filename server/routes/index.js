const express = require('express');
const menu = require('./menu');
const user = require('./user');
const order = require('./order');

const router = express.Router();

router.use('/', menu);

router.use('/', user);

router.use('/', order);

router.get('/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

module.exports = router;
