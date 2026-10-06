import React, { useState } from 'react';
import { carsData } from '../data/carsData';
import CarCard from '../components/CarCard';

const fallbackCars = [
  {
    id: 1,
    name: "BMW M5 Competition",
    category: "Deportivo",
    price: 110000,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000",
    description: "Sedán de altas prestaciones con motor V8 Twin-Turbo."
  },
  {
    id: 2,
    name: "Porsche 911 GT3 RS",
    category: "Superdeportivo",
    price: 225000,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1000",
    description: "Diseñado para dominar tanto en la pista como en la calle."
  },
  {
    id: 3,
    name: "Mercedes-AMG G 63",
    category: "SUV",
    price: 180000,
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=1000",
    description: "Lujo todoterreno con potencia inigualable."
  }
];

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'SUV', 'Superdeportivo', 'Muscle Car', 'Sedán de Lujo', 'Deportivo'];

  const rawList = (Array.isArray(carsData) && carsData.length > 0) ? carsData : fallbackCars;

  // Filtro protegido con try/catch para garantizar cero caídas por datos corruptos o indefinidos
  const filteredCars = rawList.filter(car => {
    try {
      if (!car || typeof car !== 'object') return false;
      
      const carName = car.name ? String(car.name) : '';
      const carCategory = car.category ? String(car.category) : 'Deportivo';
      const query = searchQuery ? String(searchQuery).toLowerCase() : '';
      const activeCategory = selectedCategory ? String(selectedCategory) : 'Todos';

      const matchesSearch = carName.toLowerCase().includes(query);
      const matchesCategory = activeCategory === 'Todos' || carCategory.toLowerCase() === activeCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    } catch (e) {
      return false; // Si algo falla con un auto específico, se omite de forma segura
    }
  });

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Catálogo <span className="text-amber-400">Exclusivo</span></h1>
        
        <input 
          type="text"
          placeholder="Buscar vehículo por modelo..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-zinc-950 border border-zinc-800 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-amber-400 w-full md:w-80 shadow-inner"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === category
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car, index) => (
            <CarCard key={car.id || index} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-zinc-950 rounded-2xl border border-zinc-900">
          <p className="text-zinc-500 text-sm">No encontramos vehículos que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
}