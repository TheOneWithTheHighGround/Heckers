const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const authMiddleware = require('../middleware/auth');

// Route for creating an issue
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, location } = req.body;

    // Create a new issue
    const newIssue = new Issue({
      title,
      description,
      location,
      userId: req.user.id, // assuming you are passing the user's ID via JWT
    });

    await newIssue.save();
    res.status(201).json({ message: 'Issue created successfully', issue: newIssue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;