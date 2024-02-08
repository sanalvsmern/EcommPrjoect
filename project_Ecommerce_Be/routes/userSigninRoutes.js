const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');


const secretKey = 'your-secret-key'

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        //hash the provided password and compare with stored hashedPassword.
        const hashedInputPassword = crypto.createHash('sha256').update(password).digest('hex');

        if (hashedInputPassword !== user.hashedPassword) {
            return res.status(401).json({ message: 'Incorrect password' })
        }

        // Generate token with user type information
        const token = jwt.sign({ userId: user._id, userType: user.userType }, secretKey, { expiresIn: '1h' });

        //for userType 'user'
        if (user.userType === 'user') {

            res.json({ userType: 'user', message: 'Regular user logged in', token });

        } else if (user.userType === 'seller') { //for userType 'seller'

            res.json({ userType: 'seller', message: 'Seller logged in', token });

        }


    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

});

router.post('/googleReg', async (req, res) => {

    try {
        console.log(req.body)
        const { firstName, lastName, email, googleId, userType } = req.body
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            const hashedGoogleId = crypto.createHash('sha256').update(googleId).digest('hex');
            const user = new User({ email, hashedGoogleId, userType, firstName, lastName });
            await user.save();
            const token = jwt.sign({ userId: user._id, userType: user.userType }, secretKey, { expiresIn: '1h' });
            res.status(201).json({ message: 'Registration successful', token });
        } else {
            const hashedGoogleId = crypto.createHash('sha256').update(googleId).digest('hex');
            if (hashedGoogleId !== existingUser.hashedGoogleId) {
                res.status(401).json({ message: 'Google authentication error' })
            }
            // Generate token with user type information
            const token = jwt.sign({ userId: existingUser._id, userType: existingUser.userType }, secretKey, { expiresIn: '1h' });
            res.status(200).json({ message: 'Signin successful', token })
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;



