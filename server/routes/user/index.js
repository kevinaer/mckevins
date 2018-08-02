const express = require('express');
const User = require('models/user');

const router = express.Router();

router.get('/user/:id', (req, res) => {
    User.findById(req.params.id, (err, query) => {
        if (query) {
            res.send(query);
        } else {
            res.status(404).send('User not found');
        }
    });
});

router.post('/user', (req, res) => {
    User.create({
        name: req.body.name,
        _id: req.body.id,
        url: `https://graph.facebook.com/${req.body.id}/picture?type=large`,
        accessToken: req.body.accessToken,
    }, (err, object) => {
        if (object) {
            res.send(object);
        } else {
            res.status(404).send('Cannot create user');
        }
    });
});

module.exports = router;
