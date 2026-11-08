const express = require('express');
const productRoutes = require('./productRoutes');
const router = express.Router();

// Agrega todas as rotas da aplicação
router.use('/products', productRoutes);
// Outras rotas (auth, cart) iriam aqui

module.exports = router;