const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const recommendationController = require('../controllers/recommendationController');

// Rotas de Produto
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Rota de Recomendação (aninhada para clareza)
// GET /api/products/:id/recommendations
router.get('/:id/recommendations', recommendationController.getRecommendations);

module.exports = router;