import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ui/ProductCard';
import { getProducts } from '../services/api';
import { useCart } from '../context/CartContext';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then(response => {
        setProducts(response.data);
      })
      .catch(err => console.error("Erro ao buscar produtos:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div className="home-page">
      <h2>Nossos Produtos</h2>
      <p><span className="service-badge">products-service</span></p>
      <div className="product-list-container">
        {products.map(prod => (
          <ProductCard
            key={prod.id}
            product={prod}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;