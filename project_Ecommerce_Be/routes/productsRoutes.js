const express = require('express');
const router = express.Router();
const { Product } = require('../models/product')


router.post('/productsRoutes', async (req, res) => {
    const { sellerId, productId, productName, categoryId, description, price, isAvailable,
        productImage, rating, review, vendorName, warranty } = req.body

    try {
        const existingProduct = await Product.findOne({ productId });
        if (existingProduct) {
            return res.status(409).json({ message: 'Product Id already used' })
        } else {
            const product = new Product({
                sellerId, productId, productName, categoryId, description, price, isAvailable,
                productImage, rating, review, vendorName, warranty
            });
            await product.save();
            return res.status(200).json({ message: 'Product Added Successfully' });
        }

    } catch (error) {
        console.error('Error in adding the product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})

router.get('/productsRoutes/:id', async (req, res) => {
    const sellerId = req.params.id;

    try {
        const data = await Product.find({ sellerId });
        return res.status(200).json(data)
    } catch (error) {
        console.error('Error in fetching the data', error);
        res.status(500).json({ message: 'Error fetching data', error: error.message })
    }
})

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

router.get('/allProducts', async (req, res) => {
    try {
        const products = await Product.find({});
        if (!products) {
            return res.status(404).json({ message: 'No products found' })
        } else {
            return res.status(200).json(products)
        }
    } catch (error) {
        console.error('Error in fetching all the products', error);
        res.status(500).json({ message: 'Error fetching all the products', error: error.message })
    }
})

router.get('/editProduct/:id', async (req, res) => {
    const productId = req.params.id

    try {
        const product = await Product.findOne({ productId })

        if(!product){
            return res.status(404).json({message:'Product not found'})
        }
        return res.status(200).json(product)
    } catch (error) {
        console.error('Error in fetching the data', error);
        res.status(500).json({ message: 'Error fetching data', error: error.message })
    }
})

router.put('/updateProduct/:id', async (req, res) => {
    const productId = req.params.id
    const { productName, categoryId, description, price, isAvailable,
        productImage, rating, review, vendorName, warranty } = req.body

    try {
        const updatedProduct = await Product.findOneAndUpdate(
            {productId},
            {
                productName,
                categoryId,
                description,
                price,
                isAvailable,
                productImage,
                rating,
                review,
                vendorName,
                warranty
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product updated successfully' })

    } catch (error) {
        console.error('Error in updating the product:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
})

router.delete('/deleteProduct/:id', async (req,res)=>{
    const productId = req.params.id
    try{
        const deleteProduct = await Product.findOneAndDelete({productId})

        if (!deleteProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' })

    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message})
    }
})

module.exports = router;