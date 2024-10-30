const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// sample product route
router.get('/', (req, res) => {
    res.send('Product List');
});

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;