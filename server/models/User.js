const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    availability: [String] // e.g. ["2025-04-01"]
});

module.exports = mongoose.model('User', UserSchema);
