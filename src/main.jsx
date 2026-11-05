import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CarProvider } from './context/CarContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { SalesProvider } from './context/SalesContext.jsx'; // <- Importante
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarProvider>
          <CartProvider>
            <SalesProvider> {/* <- Envuelve la app */}
              <App />
            </SalesProvider>
          </CartProvider>
        </CarProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);