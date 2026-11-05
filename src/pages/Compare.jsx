import React, { useState } from 'react';
import { useCars } from '../context/CarContext';
import { useAuth } from '../context/AuthContext';
import { formatCOP } from '../utils/helpers';
import { Link } from 'react-router-dom';

export default function Compare() {
  const { cars } = useCars();
  const { requireAuth } = useAuth();

  // Inicializa con los 2 primeros autos para que NUNCA aparezca vacío al cargar
  const [car1Id, setCar1Id] = useState(cars[0]?.id || '');
  const [car2Id, setCar2Id] = useState(cars[1]?.id || cars[0]?.id || '');

  const car1 = cars.find((c) => c.id === car1Id) || cars[0];
  const car2 = cars.find((c) => c.id === car2Id) || cars[1] || cars[0];

  const handleAction = (carName) => {
    requireAuth(() => {
      alert(`¡Solicitud de cotización registrada para el ${carName}!`);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10 text-slate-100">
      {/* Encabezado */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
          Análisis Comparativo
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Comparador de Modelos</h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Enfrenta las especificaciones técnicas y prestaciones de dos vehículos de nuestra flota.
        </p>
      </div>

      {/* Selectores de Vehículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-yellow-400 uppercase tracking-wider block">Vehículo #1</label>
          <select
            value={car1Id}
            onChange={(e) => setCar1Id(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white font-bold focus:outline-none focus:border-yellow-500"
          >
            {cars.map((c) => (
              <option key={c.id} value={c.id}>{c.brand} — {c.name}</option>
            ))}
          </select>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <label className="text-xs font-bold text-yellow-400 uppercase tracking-wider block">Vehículo #2</label>
          <select
            value={car2Id}
            onChange={(e) => setCar2Id(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white font-bold focus:outline-none focus:border-yellow-500"
          >
            {cars.map((c) => (
              <option key={c.id} value={c.id}>{c.brand} — {c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Vista Previa de Imágenes y Fichas */}
      {car1 && car2 && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[car1, car2].map((car, idx) => (
              <div key={idx} className="glass-card rounded-3xl overflow-hidden border border-slate-800 p-6 space-y-4">
                <div className="h-52 overflow-hidden rounded-2xl bg-slate-950">
                  <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-yellow-400 font-bold uppercase">{car.brand}</span>
                    <h3 className="text-xl font-bold text-white">{car.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-yellow-400 font-black text-lg block">{formatCOP(car.price)}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAction(car.name)}
                  className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-md shadow-yellow-500/10"
                >
                  Solicitar Cotización VIP
                </button>
              </div>
            ))}
          </div>

          {/* Tabla Comparativa Desagregada */}
          <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-slate-950 p-5 border-b border-slate-800 text-center font-bold">
              <span className="text-slate-400 text-left">Especificación</span>
              <span className="text-yellow-400">{car1.name}</span>
              <span className="text-yellow-400">{car2.name}</span>
            </div>

            <div className="divide-y divide-slate-800/60">
              <div className="grid grid-cols-3 p-4 text-center">
                <span className="text-slate-400 font-bold text-left">Marca</span>
                <span className="text-white">{car1.brand}</span>
                <span className="text-white">{car2.brand}</span>
              </div>
              <div className="grid grid-cols-3 p-4 text-center bg-slate-900/30">
                <span className="text-slate-400 font-bold text-left">Año / Modelo</span>
                <span className="text-white">{car1.year}</span>
                <span className="text-white">{car2.year}</span>
              </div>
              <div className="grid grid-cols-3 p-4 text-center">
                <span className="text-slate-400 font-bold text-left">Categoría</span>
                <span className="text-white">{car1.category}</span>
                <span className="text-white">{car2.category}</span>
              </div>
              <div className="grid grid-cols-3 p-4 text-center bg-slate-900/30">
                <span className="text-slate-400 font-bold text-left">Precio Comercial</span>
                <span className="text-yellow-400 font-black">{formatCOP(car1.price)}</span>
                <span className="text-yellow-400 font-black">{formatCOP(car2.price)}</span>
              </div>
              <div className="grid grid-cols-3 p-4 text-center">
                <span className="text-slate-400 font-bold text-left">Resumen Técnico</span>
                <span className="text-slate-300 leading-relaxed px-2">{car1.description}</span>
                <span className="text-slate-300 leading-relaxed px-2">{car2.description}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}