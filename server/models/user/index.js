const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    _id: Number,
    url: String,
    accessToken: String,
});

module.exports = mongoose.model('User', UserSchema);