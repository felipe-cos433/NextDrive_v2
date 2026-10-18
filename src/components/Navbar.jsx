import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-black text-white tracking-wider">
          NEXT<span className="text-yellow-500">DRIVE</span>
        </Link>

        {/* ENLACES DE NAVEGACIÓN PRINCIPAL */}
        <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
          <Link
            to="/"
            className={`transition-colors ${isActive('/') ? 'text-yellow-500' : 'text-slate-400 hover:text-white'}`}
          >
            Inicio
          </Link>
          <Link
            to="/catalog"
            className={`transition-colors ${isActive('/catalog') ? 'text-yellow-500' : 'text-slate-400 hover:text-white'}`}
          >
            Catálogo
          </Link>
          <Link
            to="/compare"
            className={`transition-colors ${isActive('/compare') ? 'text-yellow-500' : 'text-slate-400 hover:text-white'}`}
          >
            Comparar
          </Link>
          <Link
            to="/financing"
            className={`transition-colors ${isActive('/financing') ? 'text-yellow-500' : 'text-slate-400 hover:text-white'}`}
          >
            Financiación
          </Link>
          <Link
            to="/contact"
            className={`transition-colors ${isActive('/contact') ? 'text-yellow-500' : 'text-slate-400 hover:text-white'}`}
          >
            Contacto
          </Link>
        </div>

        {/* ACCIONES Y AUTENTICACIÓN */}
        <div className="flex items-center gap-4">
          
          {/* Si el usuario es ADMIN, muestra acceso directo al panel */}
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="text-xs font-bold bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-slate-950 px-3 py-2 rounded-xl transition-all"
            >
              ⚙️ Panel Admin
            </Link>
          )}

          {/* Estado de Sesión / Login */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 hidden sm:inline">
                <strong className="text-white">{user.name || user.email}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="text-xs font-bold bg-slate-900 border border-slate-800 hover:border-red-500/50 text-slate-300 hover:text-red-400 px-3 py-2 rounded-xl transition-colors"
                title="Cerrar Sesión"
              >
                🚪 Salir
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-bold bg-slate-900 border border-slate-800 text-slate-200 hover:text-white px-3.5 py-2 rounded-xl transition-colors"
              >
                Ingresar
              </Link>
              <Link
                to="/register"
                className="text-xs font-bold bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-3.5 py-2 rounded-xl transition-colors shadow-lg"
              >
                Registrarse
              </Link>
            </div>
          )}

          {/* ÍCONO DE CARRITO */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl transition-colors"
            title="Ver Carrito"
          >
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-slate-950 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

        </div>

      </nav>

      {/* COMPONENTE CARRITO LATERAL */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}