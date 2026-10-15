import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { carsData } from '../data/carsData';
import { useFavorites } from '../context/FavoritesContext'; // 👈 Importación corregida

export default function CarDetail() {
  const { id } = useParams();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const car = carsData.find((c) => String(c.id) === id);

  if (!car) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-3xl font-bold mb-4">Vehículo no encontrado</h2>
        <Link to="/catalog" className="px-6 py-3 bg-amber-500 text-black font-semibold rounded-xl">
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(car.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-black text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
    >
      <Link to="/catalog" className="text-amber-500 hover:underline text-sm mb-6 inline-block font-medium">
        &larr; Volver al Catálogo
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-zinc-950 p-8 rounded-3xl border border-zinc-800 shadow-2xl">
        <div>
          <img 
            src={car.image} 
            alt={`${car.brand} ${car.model}`} 
            className="w-full h-80 object-cover rounded-2xl border border-zinc-800 mb-4" 
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">{car.brand}</span>
            <h1 className="text-3xl font-extrabold mb-2">{car.model} ({car.year})</h1>
            <p className="text-3xl font-black text-amber-500 mb-4">{car.price}</p>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">{car.description}</p>

            <div className="space-y-3 border-t border-zinc-800 pt-4 text-sm text-zinc-300 mb-8">
              <div className="flex justify-between">
                <span className="text-zinc-400">Categoría:</span> 
                <span className="text-white font-medium">{car.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Potencia:</span> 
                <span className="text-amber-400 font-bold">{car.hp} HP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Transmisión:</span> 
                <span className="text-white font-medium">{car.transmission}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Combustible:</span> 
                <span className="text-white font-medium">{car.fuel}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => toggleFavorite(car)}
              className={`flex-1 py-3.5 rounded-xl font-semibold border transition-all ${
                favorite 
                  ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20' 
                  : 'bg-zinc-900 border-zinc-700 text-white hover:border-amber-500'
              }`}
            >
              {favorite ? '★ En Favoritos' : '☆ Guardar Favorito'}
            </button>

            <Link
              to="/contact"
              className="flex-1 text-center py-3.5 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10"
            >
              Agendar Cita
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}