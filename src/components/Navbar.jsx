import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-wider text-white">
              NEXT<span className="text-amber-500">DRIVE</span>
            </span>
          </Link>

          {/* Enlaces de Escritorio */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link to="/" className="text-zinc-300 hover:text-amber-500 transition-colors">Inicio</Link>
            <Link to="/catalog" className="text-zinc-300 hover:text-amber-500 transition-colors">Catálogo</Link>
            <Link to="/compare" className="text-zinc-300 hover:text-amber-500 transition-colors">Comparador</Link>
            <Link to="/financing" className="text-zinc-300 hover:text-amber-500 transition-colors">Financiación</Link>
            <Link to="/favorites" className="text-zinc-300 hover:text-amber-500 transition-colors">Favoritos</Link>
            <Link to="/contact" className="text-zinc-300 hover:text-amber-500 transition-colors">Contacto</Link>
          </div>

          {/* Botón menú móvil (Hamburguesa) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white focus:outline-none p-2"
              aria-label="Abrir menú"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-3">
          <button onClick={() => handleLinkClick('/')} className="block w-full text-left py-2 text-zinc-300 hover:text-amber-500 font-medium">Inicio</button>
          <button onClick={() => handleLinkClick('/catalog')} className="block w-full text-left py-2 text-zinc-300 hover:text-amber-500 font-medium">Catálogo</button>
          <button onClick={() => handleLinkClick('/compare')} className="block w-full text-left py-2 text-zinc-300 hover:text-amber-500 font-medium">Comparador</button>
          <button onClick={() => handleLinkClick('/financing')} className="block w-full text-left py-2 text-zinc-300 hover:text-amber-500 font-medium">Financiación</button>
          <button onClick={() => handleLinkClick('/favorites')} className="block w-full text-left py-2 text-zinc-300 hover:text-amber-500 font-medium">Favoritos</button>
          <button onClick={() => handleLinkClick('/contact')} className="block w-full text-left py-2 text-zinc-300 hover:text-amber-500 font-medium">Contacto</button>
        </div>
      )}
    </nav>
  );
}