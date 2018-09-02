const express = require('express');
const menuItem = require('server/models/menuItem');

const router = express.Router();

router.post('/menuItem', (req, res) => {
    menuItem.create({
        _id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        imageUrl: req.body.imageUrl,
        ingredients: req.body.ingredients,
    }, (err, object) => {
        if (object) {
            res.send(object);
        } else {
            res.status(404).send('Cannot create menu item');
        }
    });
});

router.get('/menuItem/:id', (req, res) => {
    menuItem.findById(req.params.id, (err, object) => {
        if (object) {
            res.send(object);
        } else {
            res.status(404).send('Could not find menu item');
        }
    });
});

router.put('/menuItem/:id', (req, res) => {
    menuItem.findByIdAndUpdate(
        req.params.id,
        {
            $set: { ...req.body },
        },
        (err, object) => {
            if (object) {
                res.send(object);
            } else {
                res.status(404).send('Cannot update menu item');
            }
        },
    );
});

router.get('/menu', (req, res) => {
    menuItem.find({}, (err, menu) => res.send(menu));
});

module.exports = router;
