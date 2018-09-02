const mongoose = require('mongoose');

const { Schema } = mongoose;

const STATUS = ['cart', 'placed', 'done'];

const OrderSchema = new Schema({
    _id: String,
    userId: String,
    cart: [{
        name: String,
        options: {
            type: Map,
            of: String,
        },
        instructions: String,
    }],
    status: {
        type: String,
        lowercase: true,
        enum: STATUS,
    },
});

module.exports = mongoose.model('Order', OrderSchema);
