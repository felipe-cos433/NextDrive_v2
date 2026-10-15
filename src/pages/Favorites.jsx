import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext'; // 👈 Importación corregida
import CarCard from '../components/CarCard';

export default function Favorites() {
  const { favorites } = useFavorites(); // 👈 Obtenemos la lista de favoritos del hook

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-black text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Tus Vehículos <span className="text-amber-500">Favoritos</span>
        </h1>
        <p className="text-zinc-400">
          Gestiona los modelos que has guardado para comparar o solicitar una prueba de manejo.
        </p>
      </div>

      {favorites && favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-950 rounded-3xl border border-zinc-800/80 max-w-2xl mx-auto p-8">
          <div className="w-16 h-16 bg-zinc-900 border border-zinc-700 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            ★
          </div>
          <h2 className="text-2xl font-bold mb-2">No tienes favoritos guardados</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Explora nuestro catálogo exclusivo y presiona el ícono de estrella en los vehículos que más te interesen.
          </p>
          <Link
            to="/catalog"
            className="inline-block px-6 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10"
          >
            Explorar Catálogo
          </Link>
        </div>
      )}
    </motion.div>
  );
}