const express = require('express');
const User = require('server/models/user');
const Cookies = require('universal-cookie');

const router = express.Router();

router.post('/login', (req, res) => {
    const cookies = new Cookies();
    User.findById(req.body.id, (findErr, query) => {
        if (query) {
            cookies.set('name', 'query', { path: '/', maxAge: 86400 });
            res.send(query);
        } else {
            User.create({
                name: req.body.name,
                _id: req.body.id,
                url: `https://graph.facebook.com/${req.body.id}/picture?type=large`,
                accessToken: req.body.accessToken,
            }, (createErr, object) => {
                if (object) {
                    cookies.set('name', 'query', { path: '/', maxAge: 86400 });
                    res.send(object);
                } else {
                    res.status(404).send('Cannot retrieve user');
                }
            });
        }
    });
});

module.exports = router;
