const mongoose = require('mongoose');

// Define a schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

// Create and export the model
module.exports = mongoose.model('User', userSchema);