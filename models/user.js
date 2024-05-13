const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    
    // Add other fields as needed for authentication
});

module.exports = mongoose.model('User', userSchema);
