const express = require('express');
const cors = require('cors');
const products = require('../data/products.json');
const { createLogger, errorHandler, buildHealthPayload } = require('@ecrf/shared');

const app = express();
const PORT = Number(process.env.PORT || 3001);
const startedAt = Date.now();
const logger = createLogger('products-service');

app.use(cors());
app.use(express.json());

/**
 * Health check do serviço de produtos.
 */
app.get('/health', (req, res) => {
  res.status(200).json(buildHealthPayload({ serviceName: 'products-service', port: PORT, startedAt }));
});

/**
 * Lista todo o catálogo.
 * @returns {Array<object>} Lista de produtos.
 */
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

/**
 * Busca produto por ID.
 * @param {string} req.params.id ID numérico do produto.
 * @returns {object} Produto encontrado.
 */
app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  return res.status(200).json(product);
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info('Servico iniciado', { port: PORT });
});
