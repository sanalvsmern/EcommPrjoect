// const express = require('express');
// const router = express.Router();
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
// const {user, User} = require('../models/user');


// const secretKey = 'your-secret-key'

// router.post('/login', async (req,res)=> {
//     const {email, password} = req.body;
// });

// try{
//     const user = await User.findOne({ email })
    
//     if (!user){
//         return res.status(401).json({ message: 'User not found' })
//     }

//     //hash the provided password and compare with stored hashedPassword.
//     const hashedInputPassword = crypto.createHash('sha256').update(password).digest('hex');

//     if (hashedInputPassword !== user.hashedPassword){
//         return res.stasus(401).json({ message: 'Incorrect password' })
//     }

//     const token = jwt.sign({ userId: user._id , userType = user.userType} , secretKey, { expiresIn : '1h' });

// }catch (error){
//     res.status(500).json({ message: 'Server error' })
// }

// module.exports = router;



