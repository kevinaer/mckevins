const mongoose = require('mongoose');

const { Schema } = mongoose;

const CATEGORY = ['main', 'sides'];

const MenuItemSchema = new Schema({
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
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
