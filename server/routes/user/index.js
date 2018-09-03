const express = require('express');
const User = require('server/models/user');
const Cookies = require('universal-cookie');

const router = express.Router();

router.post('/login', (req, res) => {
    User.findById(req.body.id, (err, query) => {
        const cookies = new Cookies();
        if (query) {
            cookies.set('name', 'query', { path: '/', maxAge: 86400 });
            res.send(query);
        } else {
            User.create({
                name: req.body.name,
                _id: req.body.id,
                url: req.body.url || `https://graph.facebook.com/${req.body.id}/picture?type=large`,
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

router.put('/user/admin', (req, res) => {
    User.findByIdAndUpdate(req.body.id, { $set: { isAdmin: req.body.admin } }, (err, query) => {
        if (err) {
            res.status(500).send('Could not update user');
        } else {
            res.send(query);            
        }
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
