import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo -> Lleva directo a Inicio sin pedir login */}
        <Link to="/" className="text-xl font-black text-white tracking-tight">
          NEXT<span className="text-yellow-400">DRIVE</span>
        </Link>

        {/* Enlaces de navegación totalmente libres */}
        <div className="hidden md:flex gap-6 text-xs font-bold text-slate-300">
          <Link to="/" className="hover:text-yellow-400 transition">Inicio</Link>
          <Link to="/catalog" className="hover:text-yellow-400 transition">Catálogo</Link>
          <Link to="/financing" className="hover:text-yellow-400 transition">Financiación</Link>
          <Link to="/compare" className="hover:text-yellow-400 transition">Comparar</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">Contacto</Link>
        </div>

        {/* Perfil del Usuario o Botón para Ingresar */}
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-white font-bold bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl">
                👤 Hola, <span className="text-yellow-400">{user.name}</span>
              </span>
              <button
                onClick={logout}
                className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold transition"
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