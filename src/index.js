import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Arquivo CSS global, incluindo o Tailwind
import App from './App'; // Componente principal da aplicação

// Renderizando a aplicação
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
