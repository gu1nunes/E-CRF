const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { createLogger, errorHandler, buildHealthPayload } = require('@ecrf/shared');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const startedAt = Date.now();
const logger = createLogger('api-gateway');

const serviceRegistry = [
  { name: 'products-service', port: 3001, baseUrl: process.env.PRODUCTS_SERVICE_URL || 'http://localhost:3001' },
  { name: 'auth-service', port: 3002, baseUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:3002' },
  { name: 'cart-service', port: 3003, baseUrl: process.env.CART_SERVICE_URL || 'http://localhost:3003' },
  { name: 'recommendation-service', port: 3004, baseUrl: process.env.RECOMMENDATION_SERVICE_URL || 'http://localhost:3004' }
];

app.use(cors());

/**
 * Health check do gateway.
 */
app.get('/health', (req, res) => {
  res.status(200).json(buildHealthPayload({ serviceName: 'api-gateway', port: PORT, startedAt }));
});

/**
 * Status consolidado dos microserviços.
 * Retorno: lista com nome, porta, status e uptime de cada serviço.
 */
app.get('/api/status', async (req, res) => {
  const checks = await Promise.all(
    serviceRegistry.map(async (service) => {
      try {
        const response = await axios.get(`${service.baseUrl}/health`, { timeout: 2000 });
        return {
          name: service.name,
          port: service.port,
          status: response.data.status || 'ok',
          uptime: response.data.uptime || 0
        };
      } catch (error) {
        return {
          name: service.name,
          port: service.port,
          status: 'down',
          uptime: 0
        };
      }
    })
  );

  return res.status(200).json({
    gateway: buildHealthPayload({ serviceName: 'api-gateway', port: PORT, startedAt }),
    services: checks
  });
});

/**
 * Proxy para products-service.
 */
app.use('/api/products', createProxyMiddleware({
  target: serviceRegistry[0].baseUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/': '/products/'
  }
}));

/**
 * Proxy para auth-service.
 */
app.use('/api/auth', createProxyMiddleware({
  target: serviceRegistry[1].baseUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/': '/auth/'
  }
}));

/**
 * Proxy para cart-service.
 */
app.use('/api/cart', createProxyMiddleware({
  target: serviceRegistry[2].baseUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/': '/cart/'
  }
}));

/**
 * Proxy para recommendation-service.
 */
app.use('/api/recommendations', createProxyMiddleware({
  target: serviceRegistry[3].baseUrl,
  changeOrigin: true,
  pathRewrite: {
    '^/': '/recommendations/'
  }
}));

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info('Gateway iniciado', { port: PORT });
});
