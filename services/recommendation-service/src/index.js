const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { createLogger, errorHandler, buildHealthPayload } = require('@ecrf/shared');

const app = express();
const PORT = Number(process.env.PORT || 3004);
const startedAt = Date.now();
const logger = createLogger('recommendation-service');
const PRODUCTS_BASE_URL = process.env.PRODUCTS_SERVICE_URL || 'http://localhost:3001';

app.use(cors());
app.use(express.json());

/**
 * Converte query string em array de IDs numéricos válidos.
 * @param {string|undefined} value Lista separada por vírgula.
 * @returns {number[]}
 */
function parseIds(value) {
  if (!value) {
    return [];
  }

  return String(value)
    .split(',')
    .map((part) => Number(part.trim()))
    .filter((id) => Number.isInteger(id));
}

/**
 * Busca todos os produtos no products-service.
 * @returns {Promise<Array<object>>}
 */
async function fetchProducts() {
  const response = await axios.get(`${PRODUCTS_BASE_URL}/products`);
  return response.data;
}

/**
 * Calcula ranking de recomendação.
 * Regra de pontuação:
 * 1) Mesma categoria do produto base: +50
 * 2) Produto aparece no histórico viewed: +20
 * 3) Produto aparece no carrinho atual: +30
 * 4) Bônus por faixa de preço similar (diferença <= 20%): +10
 * Ordenação final: score desc, depois id asc.
 *
 * @param {{products:Array<object>, baseProductId:number, viewedIds:number[], cartIds:number[], limit:number}} input Entradas do algoritmo.
 * @returns {Array<object>} Produtos recomendados já ordenados.
 */
function rankRecommendations({ products, baseProductId, viewedIds, cartIds, limit }) {
  const baseProduct = products.find((product) => product.id === baseProductId);
  if (!baseProduct) {
    return [];
  }

  const viewedSet = new Set(viewedIds);
  const cartSet = new Set(cartIds);

  const ranked = products
    .filter((product) => product.id !== baseProduct.id)
    .map((product) => {
      let score = 0;

      if (product.category === baseProduct.category) {
        score += 50;
      }

      if (viewedSet.has(product.id)) {
        score += 20;
      }

      if (cartSet.has(product.id)) {
        score += 30;
      }

      const priceDiffRatio = Math.abs(product.price - baseProduct.price) / Math.max(baseProduct.price, 1);
      if (priceDiffRatio <= 0.2) {
        score += 10;
      }

      return {
        ...product,
        score
      };
    })
    .filter((product) => product.score > 0)
    .sort((a, b) => b.score - a.score || a.id - b.id)
    .slice(0, limit)
    .map(({ score, ...product }) => product);

  return ranked;
}

app.get('/health', (req, res) => {
  res.status(200).json(buildHealthPayload({ serviceName: 'recommendation-service', port: PORT, startedAt }));
});

/**
 * Gera recomendações com base em produto atual, itens vistos e itens no carrinho.
 * Query params:
 * - viewed: ids separados por vírgula
 * - cart: ids separados por vírgula
 * - limit: número máximo de itens
 */
app.get('/recommendations/:productId', async (req, res, next) => {
  try {
    const baseProductId = Number(req.params.productId);
    const viewedIds = parseIds(req.query.viewed);
    const cartIds = parseIds(req.query.cart);
    const limit = Number(req.query.limit || 4);

    const products = await fetchProducts();
    const recommendations = rankRecommendations({
      products,
      baseProductId,
      viewedIds,
      cartIds,
      limit: Number.isFinite(limit) && limit > 0 ? limit : 4
    });

    return res.status(200).json(recommendations);
  } catch (error) {
    return next(error);
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info('Servico iniciado', { port: PORT, productsService: PRODUCTS_BASE_URL });
});
