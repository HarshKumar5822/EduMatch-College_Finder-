const express = require('express');
const router = express.Router();
const User = require('../models/User');
const College = require('../models/College');

// Get user profile
router.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get saved colleges
router.get('/saved-colleges/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).populate('savedColleges');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, savedColleges: user.savedColleges });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Save a college
router.post('/save-college', async (req, res) => {
    const { username, collegeId } = req.body;
    try {
        const user = await User.findOne({ username });
        const college = await College.findById(collegeId);

        if (!user || !college) {
            return res.status(404).json({ success: false, message: 'User or College not found' });
        }

        if (user.savedColleges.includes(collegeId)) {
            return res.status(400).json({ success: false, message: 'College already saved' });
        }

        user.savedColleges.push(collegeId);
        await user.save();
        res.json({ success: true, message: 'College saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router; 