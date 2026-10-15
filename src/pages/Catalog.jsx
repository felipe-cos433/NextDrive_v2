import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CarCard from '../components/CarCard';
import { cars } from '../data/cars'; // Ajusta la ruta si tus datos están en otro archivo

export default function Catalog() {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrado dinámico
  const filteredCars = cars.filter((car) => {
    const matchesCategory = filter === 'All' || car.category?.toLowerCase() === filter.toLowerCase();
    const matchesSearch = (car.name || car.title || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Encabezado Principal */}
      <div className="mb-10 text-center sm:text-left">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight mb-2"
        >
          Catálogo Exclusivo de <span className="text-amber-500">Vehículos</span>
        </motion.h1>
        <p className="text-zinc-400">
          Explora nuestra flota de lujo e inspeccionada con certificaciones de alta calidad.
        </p>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 backdrop-blur-md">
        
        {/* Campo de Búsqueda */}
        <input
          type="text"
          placeholder="Buscar vehículo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-72 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
        />

        {/* Botones de Categoría */}
        <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
          {['All', 'Híbridos', 'Eléctricos', 'Deportivos', 'SUV'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === category
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {category === 'All' ? 'Todos' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Vehículos Animados */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-950 rounded-3xl border border-zinc-800/80">
          <p className="text-zinc-500 text-lg">No se encontraron vehículos que coincidan con tu búsqueda.</p>
        </div>
      )}
    </motion.div>
  );
}