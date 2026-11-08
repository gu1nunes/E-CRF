// Mock de um banco de dados
const db_products = require('../db/products.json');

/**
 * Lógica de Recomendação v1: Simples (Mesma Categoria)
 * * Esta é a implementação "reutilizável" da lógica.
 * Ela é isolada e não tem acoplamento com o Express (req, res).
 */
class RecommendationService {

  /**
   * @param {string} productId O ID do produto base
   * @param {number} limit O número de recomendações a retornar
   */
  getRecommendationsByProduct(productId, limit = 4) {
    const numericId = parseInt(productId, 10);
    const baseProduct = db_products.find(p => p.id === numericId);

    if (!baseProduct) {
      return [];
    }

    // Lógica v1: Retorna outros produtos da mesma categoria, excluindo o próprio produto.
    const recommendations = db_products.filter(p =>
      p.category === baseProduct.category && p.id !== numericId
    );

    // Retorna apenas o limite solicitado
    return recommendations.slice(0, limit);
  }
}

// Exporta uma instância singleton do serviço
module.exports = new RecommendationService();