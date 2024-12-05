const express = require('express');
const Product = require('../models/Product');
const productController = require('../controllers/productController')
const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

// sample product route
router.get('/productRoutes/', productController.getProducts);

// router.get('/productRoutes/:id', async (req, res) => {
//     const product = await Product.findById(req.params.id);
//     res.json(product);
// });
router.get('/productRoutes/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;