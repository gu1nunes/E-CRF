const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { createLogger, errorHandler, buildHealthPayload } = require('@ecrf/shared');

const app = express();
const PORT = Number(process.env.PORT || 3003);
const startedAt = Date.now();
const logger = createLogger('cart-service');
const cartsPath = path.join(__dirname, '../data/carts.json');

app.use(cors());
app.use(express.json());

/**
 * Lê todos os carrinhos persistidos.
 * @returns {Record<string, Array<object>>}
 */
function readCarts() {
  const raw = fs.readFileSync(cartsPath, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Salva todos os carrinhos persistidos.
 * @param {Record<string, Array<object>>} carts Carrinhos por usuario.
 */
function saveCarts(carts) {
  fs.writeFileSync(cartsPath, JSON.stringify(carts, null, 2));
}

/**
 * Resolve o identificador de usuário da requisição.
 * @param {import('express').Request} req Requisição HTTP.
 * @returns {string}
 */
function resolveUserId(req) {
  return String(req.headers['x-user-id'] || req.query.userId || 'guest');
}

/**
 * Busca carrinho atual de um usuário.
 * @param {Record<string, Array<object>>} carts Mapa de carrinhos.
 * @param {string} userId Identificador do usuário.
 * @returns {Array<object>}
 */
function getUserCart(carts, userId) {
  if (!Array.isArray(carts[userId])) {
    carts[userId] = [];
  }
  return carts[userId];
}

/**
 * Resume o carrinho para retorno de API.
 * @param {Array<{id:number,name:string,price:number,imageUrl?:string,quantity:number}>} items Itens do carrinho.
 * @returns {{items:Array<object>, cartCount:number, totalPrice:number}}
 */
function buildCartResponse(items) {
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  return { items, cartCount, totalPrice };
}

app.get('/health', (req, res) => {
  res.status(200).json(buildHealthPayload({ serviceName: 'cart-service', port: PORT, startedAt }));
});

/**
 * Retorna carrinho atual.
 */
app.get('/cart', (req, res) => {
  const carts = readCarts();
  const userId = resolveUserId(req);
  const items = getUserCart(carts, userId);
  res.status(200).json(buildCartResponse(items));
});

/**
 * Adiciona item ao carrinho.
 * Entrada: { product }
 */
app.post('/cart/items', (req, res) => {
  const { product } = req.body || {};
  if (!product || typeof product.id !== 'number') {
    return res.status(400).json({ message: 'Produto invalido' });
  }

  const carts = readCarts();
  const userId = resolveUserId(req);
  const items = getUserCart(carts, userId);
  const existing = items.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ ...product, quantity: 1 });
  }

  saveCarts(carts);
  return res.status(200).json(buildCartResponse(items));
});

/**
 * Ajusta quantidade de item no carrinho.
 * Entrada: { operation: 'increment'|'decrement' }
 */
app.patch('/cart/items/:id', (req, res) => {
  const productId = Number(req.params.id);
  const { operation } = req.body || {};
  if (!['increment', 'decrement'].includes(operation)) {
    return res.status(400).json({ message: 'Operacao invalida' });
  }

  const carts = readCarts();
  const userId = resolveUserId(req);
  const items = getUserCart(carts, userId);
  const item = items.find((entry) => entry.id === productId);

  if (!item) {
    return res.status(404).json({ message: 'Item nao encontrado' });
  }

  if (operation === 'increment') {
    item.quantity += 1;
  } else {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      carts[userId] = items.filter((entry) => entry.id !== productId);
    }
  }

  saveCarts(carts);
  const nextItems = getUserCart(carts, userId);
  return res.status(200).json(buildCartResponse(nextItems));
});

/**
 * Remove item por completo.
 */
app.delete('/cart/items/:id', (req, res) => {
  const productId = Number(req.params.id);
  const carts = readCarts();
  const userId = resolveUserId(req);
  const items = getUserCart(carts, userId);
  carts[userId] = items.filter((entry) => entry.id !== productId);
  saveCarts(carts);
  return res.status(200).json(buildCartResponse(carts[userId]));
});

/**
 * Limpa carrinho por completo.
 */
app.delete('/cart/clear', (req, res) => {
  const carts = readCarts();
  const userId = resolveUserId(req);
  carts[userId] = [];
  saveCarts(carts);
  return res.status(200).json(buildCartResponse([]));
});

/**
 * Simula checkout sem gateway de pagamento.
 */
app.post('/cart/checkout', (req, res) => {
  const carts = readCarts();
  const userId = resolveUserId(req);
  const items = getUserCart(carts, userId);

  if (!items.length) {
    return res.status(400).json({ message: 'Carrinho vazio' });
  }

  const summary = buildCartResponse(items);
  carts[userId] = [];
  saveCarts(carts);

  return res.status(200).json({
    message: 'Checkout realizado com sucesso',
    order: {
      id: `ORDER-${Date.now()}`,
      items: summary.items,
      total: summary.totalPrice
    }
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info('Servico iniciado', { port: PORT });
});
