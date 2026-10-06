import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

export default function Favorites() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 bg-black min-h-screen">
      <div className="border-b border-zinc-900 pb-6">
        <span className="text-amber-400 font-bold text-xs tracking-widest uppercase bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
          Mis Favoritos
        </span>
        <h1 className="text-4xl font-extrabold font-Montserrat text-white mt-2">Vehículos Guardados ({favorites.length})</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="bg-zinc-950 border border-zinc-900 p-16 rounded-3xl text-center space-y-4">
          <p className="text-slate-400 text-sm">Aún no has agregado ningún vehículo a tus favoritos.</p>
          <Link to="/catalog" className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition btn-gold-glow">
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map(car => (
            <div 
              key={car.id} 
              className="group bg-zinc-950 border border-amber-500/20 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-amber-400/60 flex flex-col justify-between"
            >
              <div className="overflow-hidden relative h-64 bg-zinc-900">
                <img src={car.image} alt={car.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <button 
                  onClick={() => toggleFavorite(car)}
                  className="absolute top-4 right-4 bg-black/80 backdrop-blur-md p-2.5 rounded-full text-red-500 border border-red-500/30 hover:scale-110 transition"
                >
                  ❤️
                </button>
              </div>

              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-Montserrat text-white">{car.title}</h3>
                  <p className="text-2xl font-black text-amber-400">${Number(car.price).toLocaleString()}</p>
                </div>
                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Año: <strong className="text-white">{car.year || '2025'}</strong></span>
                  <Link to={`/car/${car.id}`} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition btn-gold-glow">
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}