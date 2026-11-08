// packages/client/src/pages/CartPage.jsx

import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css'; 
import './CartControls.css'; // Importe este CSS (crie se não existir)

const CartPage = () => {
  // 1. Pegamos as funções e valores do Contexto
  const { 
    cartItems, 
    cartCount, 
    totalPrice, 
    addToCart, 
    removeOneFromCart, 
    removeAllFromCart,
    clearCart
  } = useCart();
  
  const navigate = useNavigate();

  // 2. Função de Checkout
  const handleCheckout = () => {
    clearCart();
    navigate('/pedido-concluido');
  };

  // 3. Se o carrinho estiver vazio
  if (cartCount === 0) {
    return (
      <div className="cart-page">
        <h2>Seu carrinho está vazio.</h2>
        <Link to="/" className="continue-shopping">Voltar para a loja</Link>
      </div>
    );
  }

  // 4. Se tiver itens, ESTE BLOCO ABAIXO é o que faltava:
  return (
    <div className="cart-page">
      <h2>Seu Carrinho ({cartCount} {cartCount === 1 ? 'item' : 'itens'})</h2>
      
      {/* ESTA É A LISTA QUE NÃO ESTÁ APARECENDO */}
      <div className="cart-items-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p>R$ {item.price.toFixed(2)} (Unidade)</p>
              
              {/* Controles de Quantidade */}
              <div className="cart-controls">
                <button 
                  className="control-button" 
                  onClick={() => removeOneFromCart(item.id)}
                >
                  -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button 
                  className="control-button" 
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
                <button 
                  className="remove-button"
                  onClick={() => removeAllFromCart(item.id)}
                >
                  Remover
                </button>
              </div>
              <p className="item-subtotal">
                Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* FIM DA LISTA */}

      <div className="cart-summary">
        <h3>Total: R$ {totalPrice.toFixed(2)}</h3>
        <button className="checkout-button" onClick={handleCheckout}>
          Finalizar Compra
        </button>
        <Link to="/" className="continue-shopping">Continuar comprando</Link>
      </div>
    </div>
  );
};

export default CartPage;