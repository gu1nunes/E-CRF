// packages/client/src/pages/OrderCompletePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const OrderCompletePage = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h2 style={{ color: '#28a745' }}>🎉 Pedido Realizado com Sucesso!</h2>
      <p>Obrigado pela sua compra. Você pode acompanhar seu pedido na (futura) página "Meus Pedidos".</p>
      <Link to="/" className="continue-shopping">
        Voltar para a loja
      </Link>
    </div>
  );
};

export default OrderCompletePage;