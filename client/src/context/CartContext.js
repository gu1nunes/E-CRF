// packages/client/src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // --- LÓGICA DE ADICIONAR ---
  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productToAdd.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...productToAdd, quantity: 1 }];
    });
  };

  // --- LÓGICA DE DECREMENTAR ---
  const removeOneFromCart = (productId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      if (existingItem.quantity === 1) {
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  // --- LÓGICA DE REMOVER TUDO ---
  const removeAllFromCart = (productId) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  // --- A FUNÇÃO QUE FALTAVA ---
  const clearCart = () => {
    setCartItems([]);
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
    clearCart, // <-- A LINHA QUE FALTAVA
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