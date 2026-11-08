// packages/client/src/components/features/RecommendationWidget.jsx

import React, { useState, useEffect } from 'react';
import ProductCard from '../ui/ProductCard'; // <-- REUSO DE UI
import { getRecommendationsForProduct } from '../../services/api'; // <-- REUSO DE SERVIÇO
import { useCart } from '../../context/CartContext'; // <-- REUSO DE ESTADO

const RecommendationWidget = ({ currentProductId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    if (!currentProductId) return;

    setLoading(true);
    const viewedIds = JSON.parse(localStorage.getItem('ecrf_viewed_products') || '[]')
      .filter((id) => Number(id) !== Number(currentProductId));
    const cartIds = cartItems.map((item) => item.id);

    getRecommendationsForProduct(currentProductId, {
      viewed: viewedIds.join(','),
      cart: cartIds.join(','),
      limit: 4
    })
      .then(response => {
        setRecommendations(response.data);
      })
      .catch(err => console.error("Erro ao buscar recomendações:", err))
      .finally(() => setLoading(false));

  }, [currentProductId, cartItems]);
  
  if (loading) return <p>Carregando sugestões...</p>;
  if (recommendations.length === 0) return null;

  return (
    <aside className="recommendation-widget">
      <h3>Você também pode gostar</h3>
      <div className="recommendation-list">
        {recommendations.map(prod => (
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