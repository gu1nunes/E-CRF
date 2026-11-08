# cart-service

Responsabilidade: carrinho e checkout simulado.

Rotas:
- GET /health
- GET /cart
- POST /cart/items
- PATCH /cart/items/:id
- DELETE /cart/items/:id
- DELETE /cart/clear
- POST /cart/checkout

Porta padrão: 3003

Dados: arquivo local em data/carts.json

Dependências principais: express, cors, @ecrf/shared
