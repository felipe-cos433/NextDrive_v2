import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#040b14] border-t border-slate-800 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Columna 1: Marca */}
        <div className="space-y-4 md:col-span-1">
          <span className="text-xl font-extrabold font-Montserrat tracking-wider text-white">
            NEXT<span className="text-amber-400">DRIVE</span>
          </span>
          <p className="text-slate-400 text-xs leading-relaxed">
            Tu concesionario de confianza para encontrar vehículos de alta gama, deportivos y SUVs con la mejor calidad del mercado.
          </p>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div className="space-y-3">
          <h4 className="text-white font-bold font-Montserrat text-sm uppercase tracking-wider">Navegación</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-amber-400 transition">Inicio</Link></li>
            <li><Link to="/catalog" className="hover:text-amber-400 transition">Catálogo de Autos</Link></li>
            <li><Link to="/contact" className="hover:text-amber-400 transition">Contacto y Sede</Link></li>
          </ul>
        </div>

        {/* Columna 3: Categorías */}
        <div className="space-y-3">
          <h4 className="text-white font-bold font-Montserrat text-sm uppercase tracking-wider">Categorías</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/catalog" className="hover:text-amber-400 transition">Deportivos</Link></li>
            <li><Link to="/catalog" className="hover:text-amber-400 transition">SUVs Eléctricos</Link></li>
            <li><Link to="/catalog" className="hover:text-amber-400 transition">Camionetas 4x4</Link></li>
          </ul>
        </div>

        {/* Columna 4: Boletín / Newsletter */}
        <div className="space-y-3">
          <h4 className="text-white font-bold font-Montserrat text-sm uppercase tracking-wider">Mantente informado</h4>
          <p className="text-xs text-slate-400">Recibe las últimas novedades y lanzamientos en tu correo.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert('¡Gracias por suscribirte!'); }} className="space-y-2">
            <input 
              type="email" 
              placeholder="tu@correo.com" 
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-amber-400"
            />
            <button 
              type="submit" 
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 rounded-lg text-xs transition"
            >
              Suscribirse
            </button>
          </form>
        </div>

      </div>

      <div className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} NextDrive. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}