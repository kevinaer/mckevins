const mongoose = require('mongoose');

const { Schema } = mongoose;

const CATEGORY = ['main', 'sides', 'drinks', 'desserts'];

const MenuItemSchema = new Schema({
    _id: String,
    name: String,
    description: String,
    category: {
        type: String,
        lowercase: true,
        enum: CATEGORY,
    },
    imageUrl: String,
    ingredients: [{
        name: String,
        options: [String],
    }],
    disabled: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
