// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');

router.post('/save-interests', async (req, res) => {
  const { userId, interests } = req.body;  // userId and interests array
  
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.interests = interests;  // Update interests
    await user.save();
    
    res.status(200).json({ message: 'Interests saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save interests' });
  }
});

module.exports = router;
