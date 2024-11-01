const express = require('express');
const productController = require('../controllers/productController')
const router = express.Router();


// sample product route
router.get('/', (req, res) => {
    res.send('Product List');
});

router.post('/', productController.createProduct);
router.get('/', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;