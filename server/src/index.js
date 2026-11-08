const express = require('express');
const cors = require('cors');
const allRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // Permite requisições do frontend
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.send('API do E-CRF Framework - Rodando');
});

// Rotas da API
app.use('/api', allRoutes);

app.listen(PORT, () => {
  console.log(`[E-CRF Server] Rodando na porta ${PORT}`);
});