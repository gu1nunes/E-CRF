// packages/client/src/App.js
import React from 'react';
import './App.css';

// Roteamento
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Provedores de Contexto (REUSO DE ESTADO)
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

// Layout
import Header from './components/layout/Header';
import ServiceStatusPanel from './components/features/ServiceStatusPanel';

// Páginas
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrderCompletePage from './pages/OrderCompletePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    // ENVOLVA O APP COM OS DOIS PROVEDORES
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="App">
            
            <Header />

            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/carrinho" element={<CartPage />} />
                <Route path="/produto/:id" element={<ProductDetailPage />} />
                <Route path="/pedido-concluido" element={<OrderCompletePage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </main>

            <footer>
              <ServiceStatusPanel />
            </footer>
          </div>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;