import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Columna 1: Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-white">
              NEXT<span className="text-yellow-400">DRIVE</span>
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Tu concesionario de confianza para encontrar vehículos de alta gama, deportivos y SUVs con la mejor calidad del mercado.
          </p>
        </div>

        {/* Columna 2: Navegación Funcional */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Navegación</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-yellow-400 transition">Inicio</Link></li>
            <li><Link to="/catalog" className="hover:text-yellow-400 transition">Catálogo de Autos</Link></li>
            <li><Link to="/financing" className="hover:text-yellow-400 transition">Simulador de Financiación</Link></li>
            <li><Link to="/compare" className="hover:text-yellow-400 transition">Comparar Vehículos</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400 transition">Contacto y Sede</Link></li>
          </ul>
        </div>

        {/* Columna 3: Categorías Rápidas */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Categorías</h4>
          <ul className="space-y-2">
            <li><Link to="/catalog" className="hover:text-yellow-400 transition">Deportivos de Pista</Link></li>
            <li><Link to="/catalog" className="hover:text-yellow-400 transition">Sedanes de Lujo</Link></li>
            <li><Link to="/catalog" className="hover:text-yellow-400 transition">Camionetas 4x4 & SUVs</Link></li>
            <li><Link to="/catalog" className="hover:text-yellow-400 transition">Vehículos Eléctricos</Link></li>
          </ul>
        </div>

        {/* Columna 4: Boletín Interactivo */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Mantente Informado</h4>
          <p className="text-slate-400">Recibe las últimas novedades y lanzamientos en tu correo.</p>
          
          {subscribed ? (
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-xl text-yellow-400 text-center font-bold">
              ¡Gracias por suscribirte al boletín VIP!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-yellow-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition"
              >
                Suscribirse
              </button>
            </form>
          )}
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-slate-900 mt-8 pt-6 text-center text-slate-600">
        © 2026 NextDrive. Todos los derechos reservados.
      </div>
    </footer>
  );
}