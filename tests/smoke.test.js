/**
 * Testes smoke da arquitetura de microservicos.
 * Executa verificacoes de health e uma rota funcional via gateway.
 */
async function assertJson(url, validator, label) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${label} falhou com status ${response.status}`);
  }

  const body = await response.json();
  if (!validator(body)) {
    throw new Error(`${label} retornou payload invalido`);
  }

  console.log(`OK: ${label}`);
}

(async () => {
  try {
    await assertJson('http://localhost:3000/health', (body) => body.status === 'ok', 'gateway health');
    await assertJson('http://localhost:3001/health', (body) => body.status === 'ok', 'products health');
    await assertJson('http://localhost:3002/health', (body) => body.status === 'ok', 'auth health');
    await assertJson('http://localhost:3003/health', (body) => body.status === 'ok', 'cart health');
    await assertJson('http://localhost:3004/health', (body) => body.status === 'ok', 'recommendation health');
    await assertJson('http://localhost:3000/api/products', (body) => Array.isArray(body), 'gateway products proxy');

    console.log('Todos os testes smoke passaram.');
    process.exitCode = 0;
  } catch (error) {
    console.error('Falha nos testes smoke:', error.message);
    process.exitCode = 1;
  }
})();
