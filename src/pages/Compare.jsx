import React, { useState } from 'react';
import { cars } from '../data/cars'; // Ajusta la ruta si tus datos están en otro archivo

export default function Compare() {
  const [selectedCar1, setSelectedCar1] = useState(cars[0] || null);
  const [selectedCar2, setSelectedCar2] = useState(cars[1] || cars[0] || null);

  // Formateador limpio para evitar duplicar el símbolo de dólar ($$)
  const formatPrice = (price) => {
    if (!price) return '$0';
    const cleanStr = String(price).replace(/[^0-9]/g, '');
    return `$${Number(cleanStr).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Encabezado */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Comparador de <span className="text-amber-500">Modelos</span>
        </h1>
        <p className="text-zinc-400">
          Compara las prestaciones, motorización y características técnicas de nuestros vehículos exclusivos cara a cara.
        </p>
      </div>

      {/* Selectores desplegables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Seleccionar Vehículo 1</label>
          <select
            value={selectedCar1?.id || ''}
            onChange={(e) => setSelectedCar1(cars.find(c => String(c.id) === e.target.value))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
          >
            {cars.map((car) => (
              <option key={car.id} value={car.id} className="bg-zinc-900 text-white">
                {car.name || car.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Seleccionar Vehículo 2</label>
          <select
            value={selectedCar2?.id || ''}
            onChange={(e) => setSelectedCar2(cars.find(c => String(c.id) === e.target.value))}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
          >
            {cars.map((car) => (
              <option key={car.id} value={car.id} className="bg-zinc-900 text-white">
                {car.name || car.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tarjetas comparativas principales */}
      {selectedCar1 && selectedCar2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800 backdrop-blur-md">
          
          {/* Vehículo 1 */}
          <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 text-center flex flex-col justify-between">
            <div>
              <img 
                src={selectedCar1.image || selectedCar1.img} 
                alt={selectedCar1.name || selectedCar1.title} 
                className="w-full h-52 object-cover rounded-xl mb-4 border border-zinc-800" 
              />
              <h3 className="text-2xl font-bold mb-1">{selectedCar1.name || selectedCar1.title}</h3>
              <p className="text-2xl font-black text-amber-500 my-2">{formatPrice(selectedCar1.price)}</p>
            </div>
            <div className="mt-6 text-left space-y-2 border-t border-zinc-800 pt-4 text-sm text-zinc-300">
              <div className="flex justify-between"><span>Categoría:</span> <span className="text-white font-medium">{selectedCar1.category || 'Deportivo / Lujo'}</span></div>
              <div className="flex justify-between"><span>Potencia:</span> <span className="text-white font-medium">{selectedCar1.hp || selectedCar1.power || 'N/D'}</span></div>
              <div className="flex justify-between"><span>Transmisión:</span> <span className="text-white font-medium">{selectedCar1.transmission || 'Automática'}</span></div>
            </div>
          </div>

          {/* Vehículo 2 */}
          <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 text-center flex flex-col justify-between">
            <div>
              <img 
                src={selectedCar2.image || selectedCar2.img} 
                alt={selectedCar2.name || selectedCar2.title} 
                className="w-full h-52 object-cover rounded-xl mb-4 border border-zinc-800" 
              />
              <h3 className="text-2xl font-bold mb-1">{selectedCar2.name || selectedCar2.title}</h3>
              <p className="text-2xl font-black text-amber-500 my-2">{formatPrice(selectedCar2.price)}</p>
            </div>
            <div className="mt-6 text-left space-y-2 border-t border-zinc-800 pt-4 text-sm text-zinc-300">
              <div className="flex justify-between"><span>Categoría:</span> <span className="text-white font-medium">{selectedCar2.category || 'Deportivo / Lujo'}</span></div>
              <div className="flex justify-between"><span>Potencia:</span> <span className="text-white font-medium">{selectedCar2.hp || selectedCar2.power || 'N/D'}</span></div>
              <div className="flex justify-between"><span>Transmisión:</span> <span className="text-white font-medium">{selectedCar2.transmission || 'Automática'}</span></div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}