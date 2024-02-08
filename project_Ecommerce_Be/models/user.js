const mongoose = require('mongoose')

const User = mongoose.model('User', {
    id : String,
    hashedGoogleId : String,
    email : String,
    hashedPassword : String,
    userType : String,
    dob : Date,
    age : Number,
    firstName : String,
    lastName : String,
})

module.exports = { User }