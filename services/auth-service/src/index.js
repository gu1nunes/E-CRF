const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { createLogger, errorHandler, buildHealthPayload } = require('@ecrf/shared');

const app = express();
const PORT = Number(process.env.PORT || 3002);
const startedAt = Date.now();
const logger = createLogger('auth-service');
const usersPath = path.join(__dirname, '../data/users.json');

app.use(cors());
app.use(express.json());

/**
 * Lê usuários do arquivo local.
 * @returns {Array<{id: number, name: string, email: string, password: string}>}
 */
function readUsers() {
  const raw = fs.readFileSync(usersPath, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Persiste usuários no arquivo local.
 * @param {Array<object>} users Lista atualizada de usuários.
 */
function saveUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

/**
 * Gera token simples para simulação.
 * @param {{id: number, email: string}} user Dados do usuário.
 * @returns {string}
 */
function createToken(user) {
  return Buffer.from(JSON.stringify({ userId: user.id, email: user.email, issuedAt: Date.now() })).toString('base64');
}

/**
 * Decodifica token de simulação.
 * @param {string} token Token base64.
 * @returns {{userId: number, email: string}|null}
 */
function parseToken(token) {
  try {
    return JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
  } catch (error) {
    return null;
  }
}

app.get('/health', (req, res) => {
  res.status(200).json(buildHealthPayload({ serviceName: 'auth-service', port: PORT, startedAt }));
});

/**
 * Registro simulado.
 * Entrada: { email, password }
 * Saída: { token, user }
 */
app.post('/auth/register', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha sao obrigatorios' });
  }

  const users = readUsers();
  const exists = users.find((item) => item.email.toLowerCase() === String(email).toLowerCase());

  if (exists) {
    return res.status(409).json({ message: 'Usuario ja cadastrado' });
  }

  const username = String(email).split('@')[0];
  const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: formattedName,
    email: String(email).toLowerCase(),
    password: String(password)
  };

  users.push(newUser);
  saveUsers(users);

  const token = createToken(newUser);
  return res.status(201).json({ token, user: { id: newUser.id, name: newUser.name, email: newUser.email } });
});

/**
 * Login simulado.
 * Entrada: { email, password }
 * Saída: { token, user }
 */
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha sao obrigatorios' });
  }

  const users = readUsers();
  let user = users.find((item) => item.email.toLowerCase() === String(email).toLowerCase());

  if (!user) {
    const username = String(email).split('@')[0];
    const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
    user = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: formattedName,
      email: String(email).toLowerCase(),
      password: String(password)
    };
    users.push(user);
    saveUsers(users);
  }

  const token = createToken(user);
  return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

/**
 * Recupera usuário autenticado pelo token.
 */
app.get('/auth/me', (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '').trim();

  if (!token) {
    return res.status(401).json({ message: 'Token ausente' });
  }

  const payload = parseToken(token);
  if (!payload) {
    return res.status(401).json({ message: 'Token invalido' });
  }

  const users = readUsers();
  const user = users.find((item) => item.id === payload.userId);

  if (!user) {
    return res.status(404).json({ message: 'Usuario nao encontrado' });
  }

  return res.status(200).json({ id: user.id, name: user.name, email: user.email });
});

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info('Servico iniciado', { port: PORT });
});
