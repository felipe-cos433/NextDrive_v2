import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { carsData } from '../data/carsData';

export default function Compare() {
  const [selectedCar1, setSelectedCar1] = useState(carsData[0] || null);
  const [selectedCar2, setSelectedCar2] = useState(carsData[1] || carsData[0] || null);

  const formatPrice = (price) => {
    if (!price) return '$0';
    const cleanStr = String(price).replace(/[^0-9]/g, '');
    return `$${Number(cleanStr).toLocaleString()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-black text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Comparador de <span className="text-amber-500">Modelos</span>
        </h1>
        <p className="text-zinc-400">
          Compara las prestaciones, potencia y características técnicas de nuestros vehículos exclusivos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Seleccionar Vehículo 1</label>
          <select
            value={selectedCar1?.id || ''}
            onChange={(e) => setSelectedCar1(carsData.find(c => String(c.id) === e.target.value))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {carsData.map((car) => (
              <option key={car.id} value={car.id} className="bg-zinc-900 text-white">
                {car.brand} {car.model} ({car.year})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Seleccionar Vehículo 2</label>
          <select
            value={selectedCar2?.id || ''}
            onChange={(e) => setSelectedCar2(carsData.find(c => String(c.id) === e.target.value))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {carsData.map((car) => (
              <option key={car.id} value={car.id} className="bg-zinc-900 text-white">
                {car.brand} {car.model} ({car.year})
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCar1 && selectedCar2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800 backdrop-blur-md">
          
          <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between">
            <div>
              <img 
                src={selectedCar1.image} 
                alt={`${selectedCar1.brand} ${selectedCar1.model}`} 
                className="w-full h-52 object-cover rounded-xl mb-4 border border-zinc-800" 
              />
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">{selectedCar1.brand}</span>
              <h3 className="text-2xl font-bold mb-1">{selectedCar1.model} ({selectedCar1.year})</h3>
              <p className="text-3xl font-black text-amber-500 my-2">{formatPrice(selectedCar1.price)}</p>
              <p className="text-xs text-zinc-400 mb-4">{selectedCar1.description}</p>
            </div>

            <div className="space-y-2 border-t border-zinc-800 pt-4 text-sm text-zinc-300">
              <div className="flex justify-between"><span>Categoría:</span> <span className="text-white font-medium">{selectedCar1.category}</span></div>
              <div className="flex justify-between"><span>Potencia:</span> <span className="text-amber-400 font-bold">{selectedCar1.hp} HP</span></div>
              <div className="flex justify-between"><span>Transmisión:</span> <span className="text-white font-medium">{selectedCar1.transmission}</span></div>
              <div className="flex justify-between"><span>Combustible:</span> <span className="text-white font-medium">{selectedCar1.fuel}</span></div>
            </div>
          </div>

          <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between">
            <div>
              <img 
                src={selectedCar2.image} 
                alt={`${selectedCar2.brand} ${selectedCar2.model}`} 
                className="w-full h-52 object-cover rounded-xl mb-4 border border-zinc-800" 
              />
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">{selectedCar2.brand}</span>
              <h3 className="text-2xl font-bold mb-1">{selectedCar2.model} ({selectedCar2.year})</h3>
              <p className="text-3xl font-black text-amber-500 my-2">{formatPrice(selectedCar2.price)}</p>
              <p className="text-xs text-zinc-400 mb-4">{selectedCar2.description}</p>
            </div>

            <div className="space-y-2 border-t border-zinc-800 pt-4 text-sm text-zinc-300">
              <div className="flex justify-between"><span>Categoría:</span> <span className="text-white font-medium">{selectedCar2.category}</span></div>
              <div className="flex justify-between"><span>Potencia:</span> <span className="text-amber-400 font-bold">{selectedCar2.hp} HP</span></div>
              <div className="flex justify-between"><span>Transmisión:</span> <span className="text-white font-medium">{selectedCar2.transmission}</span></div>
              <div className="flex justify-between"><span>Combustible:</span> <span className="text-white font-medium">{selectedCar2.fuel}</span></div>
            </div>
          </div>

        </div>
      )}
    </motion.div>
  );
}