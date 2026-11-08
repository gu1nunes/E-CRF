// Importa nosso banco de dados mockado
const db_products = require('../db/products.json');

/**
 * Controller para buscar todos os produtos
 */
const getAllProducts = (req, res) => {
  try {
    // Apenas retorna a lista inteira do JSON
    res.status(200).json(db_products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos" });
  }
};

/**
 * Controller para buscar um produto por ID
 */
const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    // Encontra o produto no array pelo ID
    const product = db_products.find(p => p.id === parseInt(id, 10));
    
    if (product) {
      res.status(200).json(product);
    } else {
      // Se não encontrar, retorna 404
      res.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produto" });
  }
};

// Exporta as funções para as rotas usarem
module.exports = {
  getAllProducts,
  getProductById
};