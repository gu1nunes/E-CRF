// packages/client/src/pages/ProductDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Para pegar o ID da URL e criar links
import { getProductById } from '../services/api'; // Para buscar o produto na API
import { useCart } from '../context/CartContext'; // Para o botão "Adicionar ao Carrinho"
import RecommendationWidget from '../components/features/RecommendationWidget'; // O Módulo de Recomendação
import './ProductDetailPage.css'; // O CSS de estilo da página

const ProductDetailPage = () => {
  // Hooks para gerenciar o estado do componente
  const { id } = useParams(); // Pega o ID da URL (ex: "/produto/1" -> id = "1")
  const { addToCart } = useCart(); // Pega a função 'addToCart' do nosso contexto
  const [product, setProduct] = useState(null); // Armazena os dados do produto
  const [loading, setLoading] = useState(true); // Controla a mensagem "Carregando..."

  // Este 'useEffect' roda quando o componente é montado ou quando o 'id' na URL muda
  useEffect(() => {
    setLoading(true); // Mostra "Carregando..."
    
    // Chama a API para buscar os detalhes do produto
    getProductById(id)
      .then(response => {
        setProduct(response.data); // Salva os dados do produto no estado
      })
      .catch(err => console.error("Erro ao buscar produto:", err))
      .finally(() => setLoading(false)); // Esconde "Carregando..."
  }, [id]); // Dependência: Roda de novo se o 'id' mudar

  // Mostra uma mensagem de loading enquanto o produto não chega
  if (loading || !product) {
    return <p>Carregando produto...</p>;
  }

  // Renderiza a página completa
  return (
    <div className="product-detail-page">
      
      {/* 1. Link para Voltar */}
      <Link to="/" className="continue-shopping" style={{ marginBottom: '20px', display: 'inline-block' }}>
        &larr; Voltar para a loja
      </Link>

      {/* 2. Seção de Detalhes do Produto Principal */}
      <div className="product-main-details">
        <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="product-detail-description">{product.description}</p>
          <span className="product-detail-price">R$ {product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)} 
            className="add-to-cart-btn-large"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>

      <hr className="divider" />

      {/* 3. Seção de Recomendação (Componente Reutilizado) */}
      {/* Passamos o ID do produto atual para o Widget */}
      <RecommendationWidget currentProductId={product.id} />
    </div>
  );
};

export default ProductDetailPage;