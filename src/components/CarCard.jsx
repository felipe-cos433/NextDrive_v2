import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function CarCard({ car }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(car.id);

  const formatPrice = (price) => {
    if (!price) return '$0';
    const cleanStr = String(price).replace(/[^0-9]/g, '');
    return `$${Number(cleanStr).toLocaleString()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:border-amber-500/50 transition-all group flex flex-col justify-between"
    >
      <div className="relative overflow-hidden">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <button
          onClick={() => toggleFavorite(car)}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/60 border border-zinc-700 text-white hover:border-amber-500 transition-colors backdrop-blur-md"
          aria-label="Guardar en Favoritos"
        >
          <svg
            className={`w-5 h-5 ${favorite ? 'fill-amber-500 text-amber-500' : 'fill-none stroke-current'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        <span className="absolute bottom-3 left-3 bg-black/70 border border-amber-500/30 text-amber-400 text-xs px-2.5 py-1 rounded-md font-semibold backdrop-blur-md">
          {car.category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-xs text-amber-500 font-bold uppercase tracking-wider">{car.brand}</span>
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
            {car.model} ({car.year})
          </h3>
          <p className="text-2xl font-black text-amber-500 mb-3">
            {formatPrice(car.price)}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 mb-6 border-t border-zinc-800/80 pt-3">
            <div>Potencia: <span className="text-zinc-200 font-medium">{car.hp} HP</span></div>
            <div>Combustible: <span className="text-zinc-200 font-medium">{car.fuel}</span></div>
          </div>
        </div>

        <Link
          to={`/car/${car.id}`}
          className="w-full text-center py-3 bg-zinc-900 border border-zinc-700 hover:border-amber-500 hover:bg-amber-500 hover:text-black font-semibold rounded-xl text-sm transition-all"
        >
          Ver Detalles
        </Link>
      </div>
    </motion.div>
  );
}