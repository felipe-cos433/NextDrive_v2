import React from 'react';
import { Link } from 'react-router-dom';

export default function CarCard({ car }) {
  if (!car) return null;

  return (
    <div className="group relative bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden transition-all duration-500 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between">
      {/* Contenedor de Imagen con Zoom y Degradado */}
      <div className="relative h-64 overflow-hidden bg-zinc-900">
        <img 
          src={car.image || "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1000"} 
          alt={car.name || "Vehículo Exclusivo"} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
        
        {/* Etiqueta de Categoría Flotante */}
        <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-zinc-800 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
          {car.category || 'Deportivo'}
        </span>
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
            {car.name || 'Modelo Exclusivo'}
          </h3>
          <p className="text-zinc-400 text-xs mt-2 line-clamp-2 leading-relaxed">
            {car.description || 'Ingeniería de alto rendimiento y diseño aerodinámico excepcional.'}
          </p>
        </div>

        {/* Métricas clave con fuente Tabular/Mono y micro-iconos */}
        <div className="grid grid-cols-2 gap-2 my-4 py-3 border-y border-zinc-900 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{car.hp || '620'} HP</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{car.acceleration || '3.2s'} (0-100)</span>
          </div>
        </div>

        {/* Precio y Botón con microinteracción */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Precio Base</span>
            <span className="text-lg font-black text-white font-mono">
              ${Number(car.price || 150000).toLocaleString()} <span className="text-xs text-amber-400 font-sans font-normal">USD</span>
            </span>
          </div>

          <Link 
            to={`/car/${car.id || 1}`}
            className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 rounded-xl overflow-hidden transition-all duration-300 hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20 active:scale-95"
          >
            <span>Detalles</span>
          </Link>
        </div>
      </div>
    </div>
  );
}