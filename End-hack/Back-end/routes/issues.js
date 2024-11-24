const express = require('express');
const Issue = require('../models/Issue');
const { expressjwt: expressJwt } = require('express-jwt');  // Correct import for latest version
const router = express.Router();

// Middleware to verify JWT token
const protect = expressJwt({
  secret: 'your_jwt_secret',  // Use the same secret as in login
  algorithms: ['HS256']
});

// Route to flag an issue (requires authentication)
router.put('/:id/flag', protect, async (req, res) => {
  const { id } = req.params;
  try {
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    issue.flagged = true;  // Flag the issue
    await issue.save();

    res.status(200).json({ message: 'Issue flagged successfully', issue });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
