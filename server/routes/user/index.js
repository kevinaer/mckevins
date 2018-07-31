const express = require('express');
const User = require('@models/user');
const router = express.Router();

router.get('/user', (req, res) => {
    res.send({ msg: 'I am here' });
});

router.post('/user', (req, res) => {
    User.create({
        name: req.body.name, 
        _id: req.body.id,
        url: `https://graph.facebook.com/${req.body.id}/picture?type=large`,
        accessToken: req.body.accessToken,
    }, function(err, object) {
        if (err) {
            User.findById(req.body.id, function (err, query) {
                if (err) {
                    console.log(err);
                } else { 
                    res.send(query);
                }
            });
        } else {
            res.send(object);
        }
    });
});

module.exports = router;