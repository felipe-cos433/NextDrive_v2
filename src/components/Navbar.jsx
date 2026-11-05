import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout, requireAuth } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  // Controla el acceso a la vista del carrito exigiendo autenticación
  const handleOpenCart = (e) => {
    e.preventDefault();
    requireAuth(() => {
      navigate('/cart');
    });
  };

  return (
    <nav className="bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-black text-white tracking-tight">
          NEXT<span className="text-yellow-400">DRIVE</span>
        </Link>

        {/* Enlaces de navegación principales */}
        <div className="hidden md:flex gap-6 text-xs font-bold text-slate-300 items-center">
          <Link to="/" className="hover:text-yellow-400 transition">Inicio</Link>
          <Link to="/catalog" className="hover:text-yellow-400 transition">Catálogo</Link>
          <Link to="/financing" className="hover:text-yellow-400 transition">Financiación</Link>
          <Link to="/compare" className="hover:text-yellow-400 transition">Comparar</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">Contacto</Link>
        </div>

        {/* Zona derecha: Carrito, Panel Admin (si aplica) y Sesión */}
        <div className="flex items-center gap-3">
          
          {/* Botón del Carrito con Contador Reactivo */}
          <button
            onClick={handleOpenCart}
            className="relative p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-yellow-400 rounded-xl transition flex items-center gap-2 text-xs font-bold"
          >
            🛒 <span className="hidden sm:inline">Carrito</span>
            {cart && cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cart.length}
              </span>
            )}
          </button>

          {/* Enlace al Panel Admin (Visible SOLO si el rol es 'admin') */}
          {user && user.role === 'admin' && (
            <Link
              to="/admin"
              className="px-3.5 py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              ⚙️ Admin
            </Link>
          )}

          {/* Estado de Autenticación */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden lg:inline text-xs text-white font-bold bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl">
                👤 <span className="text-yellow-400">{user.name}</span>
              </span>
              <button
                onClick={logout}
                className="px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold transition"
              >
                Salir
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-md shadow-yellow-500/10"
            >
              Ingresar
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}