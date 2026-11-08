# recommendation-service

Responsabilidade: recomendações por regra explícita usando dados do products-service.

Rotas:
- GET /health
- GET /recommendations/:productId?viewed=1,2&cart=3,4&limit=4

Porta padrão: 3004

Dados: não possui base própria de catálogo; consulta products-service via HTTP.

Dependências principais: express, cors, axios, @ecrf/shared
