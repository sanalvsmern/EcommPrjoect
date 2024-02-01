const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');

router.get('/viewProduct/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const data = await Product.findOne({ productId });
        return res.status(200).json(data)
    } catch (error) {
        console.error('Error in fetching the product', error);
        res.status(500).json({ message: 'Error fetching product', error: error.message })
    }
})

module.exports = router;