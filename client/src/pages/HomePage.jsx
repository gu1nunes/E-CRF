import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ui/ProductCard';
import { getProducts } from '../services/api';
import { useCart } from '../context/CartContext'; // 1. Importa o Hook do carrinho

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); // 2. Pega a função 'addToCart' do contexto

  useEffect(() => {
    getProducts()
      .then(response => {
        setProducts(response.data);
      })
      .catch(err => console.error("Erro ao buscar produtos:", err))
      .finally(() => setLoading(false));
  }, []);

  // 3. O handleAddToCart agora é simplesmente o 'addToCart' do contexto!
  // (Nós removemos a função handleAddToCart local que só dava console.log)

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div className="home-page">
      <h2>Nossos Produtos</h2>
      <div className="product-list-container">
        {products.map(prod => (
          <ProductCard
            key={prod.id}
            product={prod}
            onAddToCart={addToCart} // 4. Passa a função do contexto para o card
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;