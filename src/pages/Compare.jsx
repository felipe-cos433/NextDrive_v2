import React, { useState } from 'react';
import { carsData } from '../data/carsData';

export default function Compare() {
  const [car1, setCar1] = useState(carsData[0]);
  const [car2, setCar2] = useState(carsData[1] || carsData[0]);

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Comparador de <span className="text-amber-400">Modelos</span></h1>
      <p className="text-zinc-400 text-sm mb-8">Compara las prestaciones y características técnicas de nuestros vehículos exclusivos.</p>

      {/* Selectores de autos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <select 
          className="bg-zinc-950 border border-zinc-800 text-white p-3 rounded-xl text-sm font-bold focus:outline-none focus:border-amber-400"
          onChange={(e) => setCar1(carsData.find(c => c.id === Number(e.target.value)))}
        >
          {carsData.map(car => <option key={car.id} value={car.id}>{car.name}</option>)}
        </select>

        <select 
          className="bg-zinc-950 border border-zinc-800 text-white p-3 rounded-xl text-sm font-bold focus:outline-none focus:border-amber-400"
          defaultValue={carsData[1]?.id}
          onChange={(e) => setCar2(carsData.find(c => c.id === Number(e.target.value)))}
        >
          {carsData.map(car => <option key={car.id} value={car.id}>{car.name}</option>)}
        </select>
      </div>

      {/* Tabla de Comparación */}
      <div className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl">
        <div className="grid grid-cols-2 border-b border-zinc-900 p-6 bg-zinc-900/50">
          <div className="text-center">
            <img src={car1.image} alt={car1.name} className="h-40 object-cover mx-auto rounded-xl mb-3 shadow-md" />
            <h2 className="font-extrabold text-lg">{car1.name}</h2>
            <span className="text-amber-400 font-bold">${car1.price?.toLocaleString()}</span>
          </div>
          <div className="text-center border-l border-zinc-900">
            <img src={car2.image} alt={car2.name} className="h-40 object-cover mx-auto rounded-xl mb-3 shadow-md" />
            <h2 className="font-extrabold text-lg">{car2.name}</h2>
            <span className="text-amber-400 font-bold">${car2.price?.toLocaleString()}</span>
          </div>
        </div>

        <div className="p-6 space-y-4 text-sm">
          <div className="grid grid-cols-2 py-2 border-b border-zinc-900/50">
            <span className="text-center text-zinc-300 font-medium">{car1.category}</span>
            <span className="text-center text-zinc-300 font-medium border-l border-zinc-900">{car2.category}</span>
          </div>
          <div className="grid grid-cols-2 py-2 border-b border-zinc-900/50">
            <span className="text-center text-zinc-400">Categoría</span>
            <span className="text-center text-zinc-400 border-l border-zinc-900">Categoría</span>
          </div>
        </div>
      </div>
    </div>
  );
}