const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');
const upload = require('../middleware/uploads');

router.post('/', upload.single('image'), productController.addProduct);
router.get('/', productController.getAllProducts);

module.exports = router;