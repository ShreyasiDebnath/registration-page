const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema'); // Import your User model

// Route to get all usernames
router.get('/usernames', async (req, res) => {
  try {
    const users = await User.find({}, 'name'); // Retrieve only the 'name' field
    const usernames = users.map(user => user.name); // Map to get only the names
    res.json(usernames);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
