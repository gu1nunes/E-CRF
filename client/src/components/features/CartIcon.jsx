// packages/client/src/components/features/CartIcon.jsx

import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom'; // 1. Importe o 'Link'
import './CartIcon.css'; // 2. (Vamos criar este CSS)

const CartIcon = () => {
  const { cartCount } = useCart();

  // 3. Troque a <div> por um <Link> que aponta para "/carrinho"
  return (
    <Link to="/carrinho" className="cart-icon-link">
      <span>🛒 Carrinho ({cartCount})</span>
    </Link>
  );
};

export default CartIcon;