const express = require('express');
const menu = require('./menu');
const user = require('./user');

const router = express.Router();

router.use('/', menu);

router.use('/', user);

router.get('/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

module.exports = router;
