/**
 * Retorna um payload padrão de health check.
 * @param {{serviceName: string, port: number|string, startedAt: number}} params Parâmetros do serviço.
 * @returns {{service: string, port: number|string, status: string, uptime: number, timestamp: string}}
 */
function buildHealthPayload({ serviceName, port, startedAt }) {
  return {
    service: serviceName,
    port,
    status: 'ok',
    uptime: Date.now() - startedAt,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  buildHealthPayload
};
