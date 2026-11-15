const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/', updateProduct);     // id dikirim di body
router.put('/:id', updateProduct);  // alternatif: id di URL
router.delete('/:id', deleteProduct);

module.exports = router;
