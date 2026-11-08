const recommendationService = require('../services/recommendationService');

// O Controller é "burro", ele apenas orquestra a requisição
// e chama o serviço reutilizável.
const getRecommendations = (req, res) => {
  try {
    const { id } = req.params;
    const recommendations = recommendationService.getRecommendationsByProduct(id);
    
    res.status(200).json(recommendations);

  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar recomendações" });
  }
};

module.exports = {
  getRecommendations
};