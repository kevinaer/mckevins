const express = require('express');
const user = require('./user');

const router = express.Router();

router.use('/', user);

router.get('/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

module.exports = router;
