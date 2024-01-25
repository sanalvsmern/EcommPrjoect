const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { User } = require('../models/user')

router.post('/register', async (req, res) => {
    const { firstName, lastName, dob, email, password, userType } = req.body;
    console.log(req.body);

    try {
        const existingUser = await User.findOne({ email });

        //if existing user found, send an error message
        if (existingUser) {

            return res.status(400).json({ message: 'Email already in use' });

        } else {

            //hash the provided password and store it in the data base
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
            const user = new User({ email, hashedPassword, userType, dob, firstName, lastName });
            await user.save();

            res.status(200).json({  message: 'Registration successful' });
        }

    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})

module.exports = router