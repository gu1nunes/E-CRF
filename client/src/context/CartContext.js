// packages/client/src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCartRequest,
  checkoutRequest
} from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const syncFromResponse = (response) => {
    setCartItems(response.data.items || []);
  };

  React.useEffect(() => {
    getCart()
      .then(syncFromResponse)
      .catch((error) => {
        console.error('Erro ao carregar carrinho:', error);
      });
  }, []);

  // --- LÓGICA DE ADICIONAR ---
  const addToCart = async (productToAdd) => {
    const response = await addCartItem(productToAdd);
    syncFromResponse(response);
  };

  // --- LÓGICA DE DECREMENTAR ---
  const removeOneFromCart = async (productId) => {
    const response = await updateCartItem(productId, 'decrement');
    syncFromResponse(response);
  };

  // --- LÓGICA DE REMOVER TUDO ---
  const removeAllFromCart = async (productId) => {
    const response = await removeCartItem(productId);
    syncFromResponse(response);
  };

  // --- A FUNÇÃO QUE FALTAVA ---
  const clearCart = async () => {
    const response = await clearCartRequest();
    syncFromResponse(response);
  };

  const checkout = async () => {
    const response = await checkoutRequest();
    await clearCart();
    return response.data;
  };
  
  // --- CÁLCULOS ---
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  // O valor compartilhado com o App
  const value = {
    cartItems,
    addToCart,
    removeOneFromCart,
    removeAllFromCart,
    cartCount,
    totalPrice,
    clearCart,
    checkout
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook customizado
export const useCart = () => {
  return useContext(CartContext);
};