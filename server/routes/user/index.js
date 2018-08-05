const express = require('express');
const User = require('server/models/user');

const router = express.Router();

router.post('/login', (req, res) => {
    User.findById(req.body.id, (findErr, query) => {
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

module.exports = router;
