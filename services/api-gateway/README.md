# api-gateway

Responsabilidade: ponto único de entrada do frontend e roteamento para os microserviços.

Rotas:
- GET /health
- GET /api/status
- Proxy /api/products -> products-service
- Proxy /api/auth -> auth-service
- Proxy /api/cart -> cart-service
- Proxy /api/recommendations -> recommendation-service

Porta padrão: 3000

Dados: não persiste dados.

Dependências principais: express, cors, axios, http-proxy-middleware, @ecrf/shared
