// packages/client/src/components/ui/ProductCard.jsx

import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom'; // 1. Importe o Link

const ProductCard = ({ product, onAddToCart }) => {
  
  if (!product) {
    return null;
  }

  const handleAddClick = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="product-card">
      {/* 2. Envolva a imagem e o nome em um Link para a página do produto */}
      <Link to={`/produto/${product.id}`} className="product-link">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <h3 className="product-name">{product.name}</h3>
      </Link>
      
      <p className="product-category">{product.category}</p>
      <p className="product-price">R$ {product.price.toFixed(2)}</p>
      
      {onAddToCart && (
        <button onClick={handleAddClick} className="add-to-cart-btn">
          Adicionar ao Carrinho
        </button>
      )}
    </div>
  );
};

export default ProductCard;