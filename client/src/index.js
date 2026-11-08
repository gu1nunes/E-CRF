import React from 'react';
import ReactDOM from 'react-dom/client';

// Importa o componente principal (vamos criá-lo em breve)
import App from './App'; 

// Diz ao React para "pegar" o seu app e injetar
// na <div id="root"> do seu index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);