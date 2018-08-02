const express = require('express');
const menuItem = require('server/models/menuItem');

const router = express.Router();

router.post('/menuItem', (req, res) => {
    menuItem.create({
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        ingredients: req.body.ingredients,
    }, (err, object) => {
        if (object) {
            res.send(object);
        } else {
            res.status(404).send('Cannot create user');
        }
    });
});

module.exports = router;
