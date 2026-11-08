// packages/client/src/components/features/RecommendationWidget.jsx

import React, { useState, useEffect } from 'react';
import ProductCard from '../ui/ProductCard'; // <-- REUSO DE UI
import { getRecommendationsForProduct } from '../../services/api'; // <-- REUSO DE SERVIÇO
import { useCart } from '../../context/CartContext'; // <-- REUSO DE ESTADO

const RecommendationWidget = ({ currentProductId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart(); // 1. Pega a função 'addToCart' do contexto

  useEffect(() => {
    if (!currentProductId) return;

    setLoading(true);
    getRecommendationsForProduct(currentProductId)
      .then(response => {
        setRecommendations(response.data);
      })
      .catch(err => console.error("Erro ao buscar recomendações:", err))
      .finally(() => setLoading(false));

  }, [currentProductId]);
  
  if (loading) return <p>Carregando sugestões...</p>;
  if (recommendations.length === 0) return null;

  return (
    <aside className="recommendation-widget">
      <h3>Você também pode gostar</h3>
      <div className="recommendation-list">
        {recommendations.map(prod => (
          // 2. O MESMO ProductCard, usando a MESMA função de 'addToCart'
          <ProductCard 
            key={`rec-${prod.id}`} 
            product={prod}
            onAddToCart={addToCart} 
          />
        ))}
      </div>
    </aside>
  );
};

export default RecommendationWidget;