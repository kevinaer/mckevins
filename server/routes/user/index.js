const express = require('express');
const User = require('server/models/user');

const router = express.Router();

router.post('/login', (req, res) => {
    User.findById(req.body.id, (err, query) => {
        if (query) {
            res.send(query);
        } else {
            User.create({
                name: req.body.name,
                _id: req.body.id,
                url: `https://graph.facebook.com/${req.body.id}/picture?type=large`,
                accessToken: req.body.accessToken,
            }, (createErr, object) => {
                if (object) {
                    res.send(object);
                } else {
                    res.status(404).send('Cannot retrieve user');
                }
            });
        }
    });
});

router.put('/user/admin', (req, res) => {
    User.findByIdAndUpdate(req.body.id, { $set: { isAdmin: req.body.admin } }, (err, query) => {
        if (err) {
            res.status(500).send('Could not update user');
        }
        res.send(query);
    });
});

router.get('/users', (req, res) => {
    User.find({}, (err, query) => {
        if (query) {
            res.send(query);
        } else {
            res.status(404).send('Cannot retrieve users');
        }
    });
});

module.exports = router;
