const mongoose = require('mongoose')

const Cart = mongoose.model('Cart', {
    userId: String,
    sellerId : String,
    productId : String, 
    productName : String,
    price : Number,
    productImage : String,
    totalPrice: Number,
    orderStatus: Boolean,
    deliveryStatus: Boolean
})

module.exports = { Cart };