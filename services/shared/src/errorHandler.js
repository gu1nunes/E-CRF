/**
 * Middleware global de erro para microserviços Express.
 * @param {Error} err Erro capturado.
 * @param {import('express').Request} req Requisição HTTP.
 * @param {import('express').Response} res Resposta HTTP.
 * @param {import('express').NextFunction} next Próximo middleware.
 */
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Erro interno do servidor',
    path: req.originalUrl
  });
}

module.exports = {
  errorHandler
};
