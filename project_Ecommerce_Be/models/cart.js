const mongoose = require('mongoose')

const Cart = mongoose.model('Cart', {
    productId: String,
    sellerId : String,
    userId: String,
    quantity : Number,
    orderStatus : String
})

module.exports = { Cart };