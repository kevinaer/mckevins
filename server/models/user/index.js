const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    _id: String,
    url: String,
    isAdmin: { type: Boolean, default: false },
    accessToken: String,
    isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
