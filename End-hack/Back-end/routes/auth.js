const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            username,
            password
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Login user and return JWT token
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            'your_jwt_secret', // Use a strong secret key for production
            { expiresIn: '1h' } // Token expiration time
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;