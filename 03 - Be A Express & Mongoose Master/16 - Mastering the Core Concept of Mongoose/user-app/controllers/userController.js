const User = require('../models/User');

// @desc Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get users', error: error.message });
    }
};

// @desc Get a single user
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Send the user if found
    } catch (error) {
        res.status(500).json({ message: 'Failed to get user', error: error.message });
    }
};

// @desc Create a user
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body); // Fixed: user.body -> req.body
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error: error.message });
    }
};

// @desc Update a user
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
            runValidators: true // Added to ensure updates follow schema validation
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
};

// @desc Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
}