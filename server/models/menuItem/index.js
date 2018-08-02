const mongoose = require('mongoose');

const { Schema } = mongoose;

const MenuItemSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    ingredients: [{
        name: String,
        options: [String],
    }],
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
