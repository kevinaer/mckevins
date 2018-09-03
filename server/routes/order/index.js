const express = require('express');
const order = require('server/models/order');
const uuidv1 = require('uuid/v1');

const router = express.Router();

router.get('/orders', (req, res) => {
    order.find({}, (err, query) => {
        if (query) {
            res.send(query);
        } else {
            res.status(404).send('Cannot retrieve order');
        }
    });
})

router.get('/order/cart/:userId', (req, res) => {
    order.findOne({
        userId: req.params.userId,
        status: 'cart',
    }, (err, cart) => {
        if (cart) {
            res.send(cart);   
        } else {
            order.create({
                _id: uuidv1(),
                userId: req.params.userId,
                cart: [],
                status: 'cart',
            }, (err1, cart1) => {
                if (cart1) {
                    res.send(cart1);
                } else {
                    res.status(404).send('Could not create cart');
                }
            })
        }
    });
});

router.post('/order/cart/:userId', (req, res) => {
    order.findOne({
        userId: req.params.userId,
        status: 'cart',
    }, (err, cart) => {
        if (cart) {
            cart.cart = req.body.cart;
            order.updateOne({ _id: cart._id }, { cart: cart.cart }, (err, updated) => {
                if (updated) {
                    res.send(cart);
                } else {
                    res.status(404).send('Could not update cart');
                }
            })
        } else {
            res.status(404).send('Could not add to cart');
        }
    });
});

router.post('/order/cart/:userId/place', (req, res) => {
    order.findOneAndUpdate(
        { userId: req.params.userId, status: 'cart' },
        { $set: { status: 'placed'} },
        (err, cart) => {
            if (cart) {
                res.send(null);
            } else {
                res.status(404).send('Could not update cart');
            }
        }
    )
});

router.post('/order/:orderId/done', (req, res) => {
    order.findOneAndUpdate(
        { _id: req.params.orderId, status: 'placed' },
        { $set: { status: 'done' } },
        (err, cart) => {
            if (cart) {
                res.send(null);
            } else {
                res.status(404).send('Could not update cart');
            }
        }
    )
});

module.exports = router;
