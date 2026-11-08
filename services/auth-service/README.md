# auth-service

Responsabilidade: autenticacao simulada com token.

Rotas:
- GET /health
- POST /auth/register
- POST /auth/login
- GET /auth/me

Porta padrão: 3002

Dados: arquivo local em data/users.json

Dependências principais: express, cors, @ecrf/shared
