import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CarProvider } from './context/CarContext.jsx'; // Si usas contexto de autos
import { CartProvider } from './context/CartContext.jsx'; // Si usas carrito
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CarProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);