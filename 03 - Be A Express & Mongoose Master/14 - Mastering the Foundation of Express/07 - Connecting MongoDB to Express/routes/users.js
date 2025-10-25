const express = require('express');
const route = express.Router();
const User = require('../models/User');

// CREATE: Add a new user
route.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
});

// READ: Get all users
route.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ: Get a single user by id
route.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.send(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE: Update a user
route.put('/:id', async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(updateUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE: Remove a user
route.delete('/:id', async(req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id);
        res.json({message: "User Deleted"});
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = route;